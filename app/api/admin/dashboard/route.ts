import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdminSession();

    const [
      totalCustomers,
      totalInquiries,
      newInquiries,
      pendingInquiries,
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      totalServices,
      totalProjects,
      recentInquiries,
      recentAppointments,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "NEW" } }),
      prisma.inquiry.count({ where: { status: "IN_PROGRESS" } }),
      prisma.appointment.count(),
      prisma.appointment.count({ where: { bookingStatus: "PENDING" } }),
      prisma.appointment.count({ where: { bookingStatus: "CONFIRMED" } }),
      prisma.service.count(),
      prisma.project.count(),
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.appointment.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalCustomers,
        totalInquiries,
        newInquiries,
        pendingInquiries,
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        totalServices,
        totalProjects,
      },
      recentInquiries,
      recentAppointments,
    });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED_ADMIN_ACCESS") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to fetch dashboard metrics" }, { status: 500 });
  }
}
