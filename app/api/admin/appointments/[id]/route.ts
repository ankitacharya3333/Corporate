import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { sendAppointmentStatusUpdate } from "@/lib/email";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const body = await req.json();

    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        bookingStatus: body.bookingStatus,
        appointmentDate: body.appointmentDate,
        appointmentTime: body.appointmentTime,
        notes: body.notes,
      },
    });

    // If status changed to CONFIRMED, RESCHEDULED, or CANCELLED, send notification
    if (["CONFIRMED", "RESCHEDULED", "CANCELLED"].includes(appointment.bookingStatus)) {
      await sendAppointmentStatusUpdate({
        id: appointment.id,
        referenceNumber: appointment.referenceNumber,
        customerName: appointment.customerName,
        email: appointment.email,
        selectedService: appointment.selectedService,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        status: appointment.bookingStatus as any,
      }).catch((e) => console.error("[Appointment Update Email Failed]:", e));
    }

    return NextResponse.json({ success: true, appointment });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED_ADMIN_ACCESS") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminSession();
    const { id } = await params;

    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED_ADMIN_ACCESS") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 });
  }
}

