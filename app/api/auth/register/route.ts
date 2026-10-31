import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { customerRegisterSchema } from "@/lib/validations";
import { hashPassword, signSessionToken, setSessionCookie } from "@/lib/auth";
import { sendUserRegistrationAdminNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = customerRegisterSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fullName, email, company, password } = validated.data;

    // Check existing email
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this corporate email address is already registered." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Create user (Strictly default to CUSTOMER role - no self-assignment of ADMIN)
    const user = await prisma.user.create({
      data: {
        name: fullName,
        email: email.toLowerCase(),
        company,
        passwordHash,
        role: "CUSTOMER",
        accountStatus: "ACTIVE",
      },
    });

    // Notify business admin of new registration
    await sendUserRegistrationAdminNotification(user).catch((e) =>
      console.error("[Registration Admin Alert Failed]:", e)
    );

    // Issue session token
    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await setSessionCookie(token);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[API Register Error]:", error);
    return NextResponse.json(
      { error: "Failed to register account. Please try again." },
      { status: 500 }
    );
  }
}

