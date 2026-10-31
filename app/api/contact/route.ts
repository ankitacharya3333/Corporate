import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validations";
import { sendInquiryAdminNotification, sendInquiryClientConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = contactFormSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fullName, email, organization, phone, serviceInterest, subject, message } = validated.data;

    // Generate readable institutional ticket reference
    const count = await prisma.inquiry.count();
    const ticketNumber = `INQ-${new Date().getFullYear()}-${String(count + 8816).padStart(4, "0")}`;

    // 1. Atomically store customer submission in PostgreSQL first
    const inquiry = await prisma.inquiry.create({
      data: {
        ticketNumber,
        name: fullName,
        email,
        phone: phone || null,
        organization,
        subject,
        message,
        inquiryType: serviceInterest,
        status: "NEW",
      },
    });

    // 2. Dispatch notifications to business (rmnrr333@gmail.com) and client
    await Promise.allSettled([
      sendInquiryAdminNotification(inquiry),
      sendInquiryClientConfirmation(inquiry),
    ]);

    return NextResponse.json(
      {
        success: true,
        ticketNumber: inquiry.ticketNumber,
        id: inquiry.id,
        message: "Inquiry successfully recorded and queued for practice review.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[API Contact/Inquiry Error]:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry. Please try again or contact advisory directly." },
      { status: 500 }
    );
  }
}
