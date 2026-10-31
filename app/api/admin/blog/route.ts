import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedDate: "desc" },
    });
    return NextResponse.json({ posts });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdminSession();
    const body = await req.json();

    const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug,
        summary: body.summary || "",
        content: body.content || "",
        category: body.category || "Architecture",
        authorName: body.authorName || "Marcus Vance",
        authorRole: body.authorRole || "Chief Systems Architect",
        publicationStatus: body.publicationStatus || "PUBLISHED",
      },
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED_ADMIN_ACCESS") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdminSession();
    const body = await req.json();

    const post = await prisma.blogPost.update({
      where: { id: body.id },
      data: {
        publicationStatus: body.publicationStatus,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED_ADMIN_ACCESS") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdminSession();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED_ADMIN_ACCESS") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

