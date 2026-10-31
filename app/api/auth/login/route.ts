import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { customerLoginSchema } from "@/lib/validations";
import { verifyPassword, signSessionToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = customerLoginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid credentials format" },
        { status: 400 }
      );
    }

    const { email, password } = validated.data;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || user.accountStatus === "SUSPENDED") {
      return NextResponse.json(
        { error: "Invalid corporate credentials or suspended account" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid corporate credentials" },
        { status: 401 }
      );
    }

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
      },
    });
  } catch (error: any) {
    console.error("[API Login Error]:", error);
    return NextResponse.json(
      { error: "Authentication system failure. Please try again." },
      { status: 500 }
    );
  }
}
