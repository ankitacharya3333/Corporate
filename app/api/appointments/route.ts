import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { appointmentFormSchema } from "@/lib/validations";
import { sendAppointmentAdminNotification, sendAppointmentClientConfirmation } from "@/lib/email";
import { requireCustomerSession } from "@/lib/auth";

// Availability check: returns already confirmed slots for a given date
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "Date parameter required" }, { status: 400 });
    }

    const booked = await prisma.appointment.findMany({
      where: {
        appointmentDate: date,
        bookingStatus: {
          in: ["PENDING", "CONFIRMED"],
        },
      },
      select: {
        appointmentTime: true,
      },
    });

    const bookedTimes = booked.map((b) => b.appointmentTime);
    return NextResponse.json({ bookedTimes });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to check availability" }, { status: 500 });
  }
}

// Request Consultation Slot
export async function POST(req: NextRequest) {
  try {
    // 1. Enforce authentication and account status server-side
    let authUser;
    try {
      const authResult = await requireCustomerSession();
      authUser = authResult.user;
    } catch (authError: any) {
      if (authError.message === "ACCOUNT_SUSPENDED") {
        return NextResponse.json(
          { error: "Your corporate account is suspended. Please contact firm administration." },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { error: "Authentication required. Please sign in to book an executive consultation." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validated = appointmentFormSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      fullName,
      workEmail,
      company,
      serviceInterest,
      meetingType,
      preferredDate,
      preferredTime,
      projectScopeBrief,
    } = validated.data;

    // Check conflict constraint
    const existingConfirmed = await prisma.appointment.findFirst({
      where: {
        appointmentDate: preferredDate,
        appointmentTime: preferredTime,
        bookingStatus: "CONFIRMED",
      },
    });

    if (existingConfirmed) {
      return NextResponse.json(
        {
          error: "Selected consultation window is already confirmed for another briefing. Please choose an alternate window.",
        },
        { status: 409 }
      );
    }

    const count = await prisma.appointment.count();
    const referenceNumber = `VM-APT-${String(count + 4905).padStart(4, "0")}`;

    // Store appointment in PostgreSQL associated with customer ID
    const appointment = await prisma.appointment.create({
      data: {
        referenceNumber,
        customerName: fullName,
        email: workEmail,
        organization: company,
        selectedService: serviceInterest,
        meetingType,
        appointmentDate: preferredDate,
        appointmentTime: preferredTime,
        message: projectScopeBrief,
        bookingStatus: "PENDING",
        customerId: authUser.id,
      },
    });

    // Notify business (rmnrr333@gmail.com) and client
    await Promise.allSettled([
      sendAppointmentAdminNotification(appointment),
      sendAppointmentClientConfirmation(appointment),
    ]);

    return NextResponse.json(
      {
        success: true,
        referenceNumber: appointment.referenceNumber,
        bookingStatus: appointment.bookingStatus,
        id: appointment.id,
        message: "Consultation slot successfully held for administrative review.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[API Appointments Error]:", error);
    return NextResponse.json(
      { error: "Failed to process appointment booking." },
      { status: 500 }
    );
  }
}

