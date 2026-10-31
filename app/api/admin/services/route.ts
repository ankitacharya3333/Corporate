import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ services });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdminSession();
    const body = await req.json();

    const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const service = await prisma.service.create({
      data: {
        name: body.name,
        slug,
        category: body.category || "Systems Engineering",
        shortDescription: body.shortDescription || "",
        description: body.description || "",
        capabilities: body.capabilities || [],
        deliverables: body.deliverables || [],
        leadTime: body.leadTime || "6 to 12 weeks",
        published: body.published ?? true,
      },
    });

    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED_ADMIN_ACCESS") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdminSession();
    const body = await req.json();

    const service = await prisma.service.update({
      where: { id: body.id },
      data: {
        published: body.published,
        name: body.name,
        description: body.description,
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED_ADMIN_ACCESS") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdminSession();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED_ADMIN_ACCESS") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
