import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/validations";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = body.token;
    const validated = resetPasswordSchema.safeParse(body);

    if (!token || !validated.success) {
      return NextResponse.json({ error: "Invalid token or password requirements not met" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Password reset link is invalid or has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(validated.data.password);

    // Update password and invalidate reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password successfully updated. You may now log in.",
    });
  } catch (error: any) {
    console.error("[API Reset Password Error]:", error);
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}

