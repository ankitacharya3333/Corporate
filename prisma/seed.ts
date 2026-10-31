import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SERVICES_DATA, PROJECTS_DATA, BLOG_POSTS, MOCK_INQUIRIES, MOCK_APPOINTMENTS } from "../lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database provisioning & seeding...");

  // 1. Provision Administrator
  const adminEmail = process.env.ADMIN_EMAIL || "rmnrr333@gmail.com";
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "Vanguard#Admin2026!SecureKey";
  const adminPasswordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: "ADMIN",
      accountStatus: "ACTIVE",
    },
    create: {
      name: "Marcus Vance (Principal Admin)",
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      company: "Vanguard Meridian Advisory & Engineering Corp.",
      phone: "+1 (212) 849-3100",
      accountStatus: "ACTIVE",
    },
  });
  console.log(`[Provisioned Admin]: ${admin.email} (ID: ${admin.id})`);

  // 2. Seed Customer Account
  const clientPasswordHash = await bcrypt.hash("ClientPass123!", 12);
  const client = await prisma.user.upsert({
    where: { email: "e.sterling@sterling-capital.example" },
    update: {},
    create: {
      name: "Eleanor Sterling",
      email: "e.sterling@sterling-capital.example",
      passwordHash: clientPasswordHash,
      role: "CUSTOMER",
      company: "Sterling Private Capital",
      phone: "+1 (312) 555-0192",
      accountStatus: "ACTIVE",
    },
  });
  console.log(`[Seed Customer]: ${client.email}`);

  // 3. Seed Services
  for (const srv of SERVICES_DATA) {
    await prisma.service.upsert({
      where: { slug: srv.slug },
      update: {},
      create: {
        name: srv.title,
        slug: srv.slug,
        shortDescription: srv.shortDescription,
        description: srv.fullDescription,
        category: srv.category,
        capabilities: srv.capabilities,
        deliverables: srv.deliverables,
        leadTime: srv.leadTime,
        published: srv.published,
        featured: srv.featured,
        status: "ACTIVE",
      },
    });
  }
  console.log(`[Seed Services]: ${SERVICES_DATA.length} seeded`);

  // 4. Seed Projects / Case Studies
  for (const proj of PROJECTS_DATA) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: {},
      create: {
        name: proj.title,
        slug: proj.slug,
        category: proj.clientIndustry,
        timeline: proj.timeline,
        description: proj.summary,
        challenge: proj.challenge,
        approach: proj.approach,
        outcomesJson: JSON.stringify(proj.outcomes),
        tags: proj.tags,
        published: proj.published,
        featured: proj.featured,
        status: "ACTIVE",
      },
    });
  }
  console.log(`[Seed Projects]: ${PROJECTS_DATA.length} seeded`);

  // 5. Seed Blog Posts / Whitepapers
  for (const post of BLOG_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        summary: post.summary,
        content: post.content,
        category: post.category,
        readTime: post.readTime,
        authorName: post.author.name,
        authorRole: post.author.role,
        publicationStatus: "PUBLISHED",
        publishedDate: new Date(post.publishedAt),
      },
    });
  }
  console.log(`[Seed Blog Posts]: ${BLOG_POSTS.length} seeded`);

  // 6. Seed Inquiries
  for (const inq of MOCK_INQUIRIES) {
    await prisma.inquiry.upsert({
      where: { ticketNumber: inq.ticketNumber },
      update: {},
      create: {
        ticketNumber: inq.ticketNumber,
        name: inq.name,
        email: inq.email,
        phone: inq.phone,
        organization: inq.organization,
        subject: inq.subject,
        message: inq.message,
        inquiryType: inq.serviceInterest,
        status: inq.status === "in_review" ? "IN_PROGRESS" : inq.status === "resolved" ? "RESOLVED" : "NEW",
        createdAt: new Date(inq.submittedAt),
      },
    });
  }
  console.log(`[Seed Inquiries]: ${MOCK_INQUIRIES.length} seeded`);

  // 7. Seed Appointments
  for (const apt of MOCK_APPOINTMENTS) {
    await prisma.appointment.upsert({
      where: { referenceNumber: apt.bookingRef },
      update: {},
      create: {
        referenceNumber: apt.bookingRef,
        customerName: apt.clientName,
        email: apt.clientEmail,
        organization: apt.organization,
        selectedService: apt.serviceRequested,
        appointmentDate: apt.preferredDate,
        appointmentTime: apt.preferredTime,
        meetingType: apt.meetingType,
        notes: apt.notes,
        bookingStatus: apt.status === "confirmed" ? "CONFIRMED" : "PENDING",
      },
    });
  }
  console.log(`[Seed Appointments]: ${MOCK_APPOINTMENTS.length} seeded`);

  console.log("Database provisioning complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
