import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { adminLoginSchema } from "@/lib/validations";
import { verifyPassword, signSessionToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = adminLoginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid administrative credentials format" },
        { status: 400 }
      );
    }

    const { email, password } = validated.data;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Check account existence and STRICT ADMIN ROLE requirement
    if (!user || user.role !== "ADMIN" || user.accountStatus !== "ACTIVE") {
      return NextResponse.json(
        { error: "Access denied. Unauthorized administrative identity." },
        { status: 403 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid administrative passphrase" },
        { status: 401 }
      );
    }

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: "ADMIN",
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: "ADMIN",
      },
    });
  } catch (error: any) {
    console.error("[API Admin Login Error]:", error);
    return NextResponse.json(
      { error: "Internal administrative authentication failure" },
      { status: 500 }
    );
  }
}
