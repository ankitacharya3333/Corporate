import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/validations";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = forgotPasswordSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { email } = validated.data;
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Security practice: Always return generic success to avoid email enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If that email exists in our registry, reset instructions have been sent.",
      });
    }

    // Generate cryptographic token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpires: expires,
      },
    });

    await sendPasswordResetEmail({
      name: user.name,
      email: user.email,
      token,
    });

    return NextResponse.json({
      success: true,
      message: "If that email exists in our registry, reset instructions have been sent.",
    });
  } catch (error: any) {
    console.error("[API Forgot Password Error]:", error);
    return NextResponse.json({ error: "Failed to process reset request" }, { status: 500 });
  }
}

