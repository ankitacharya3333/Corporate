import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireAdminSession();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const where: any = {};
    if (status && status !== "ALL") {
      where.bookingStatus = status;
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ appointments });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED_ADMIN_ACCESS") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}
