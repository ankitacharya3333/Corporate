import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const DEFAULT_CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "rmnrr333@gmail.com";
export const DEFAULT_EMAIL_FROM = process.env.EMAIL_FROM || "Vanguard Meridian Partners <onboarding@resend.dev>";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  notificationType: string;
  inquiryId?: string;
  appointmentId?: string;
}

/**
 * Robust Central Email Dispatcher
 * Implements the Outbox / Tracking Pattern:
 * Always logs status and error message to the database table `EmailNotification`.
 * If RESEND_API_KEY is not configured or in development, logs cleanly without breaking user submission.
 */
export async function sendEmail({
  to,
  subject,
  html,
  notificationType,
  inquiryId,
  appointmentId,
}: SendEmailOptions) {
  // 1. Initial pending notification record in DB
  const notification = await prisma.emailNotification.create({
    data: {
      recipient: to,
      subject,
      notificationType,
      inquiryId,
      appointmentId,
      deliveryStatus: "PENDING",
    },
  });

  // 2. Fallback when Resend is not configured (e.g. simulated development)
  if (!resend) {
    console.info(`[Email Service - Simulated] To: ${to} | Subject: "${subject}"`);
    await prisma.emailNotification.update({
      where: { id: notification.id },
      data: {
        deliveryStatus: "SENT",
        providerMessageId: `simulated-${Date.now()}`,
      },
    });
    return { success: true, simulated: true, id: notification.id };
  }

  // 3. Live dispatch via Resend
  try {
    const result = await resend.emails.send({
      from: DEFAULT_EMAIL_FROM,
      to,
      subject,
      html,
    });

    if (result.error) {
      console.error("[Email Service - Delivery Error]:", result.error);
      await prisma.emailNotification.update({
        where: { id: notification.id },
        data: {
          deliveryStatus: "FAILED",
          errorMessage: result.error.message,
        },
      });
      return { success: false, error: result.error.message, id: notification.id };
    }

    await prisma.emailNotification.update({
      where: { id: notification.id },
      data: {
        deliveryStatus: "SENT",
        providerMessageId: result.data?.id,
      },
    });

    return { success: true, providerId: result.data?.id, id: notification.id };
  } catch (error: any) {
    console.error("[Email Service - Exception]:", error);
    await prisma.emailNotification.update({
      where: { id: notification.id },
      data: {
        deliveryStatus: "FAILED",
        errorMessage: error?.message || "Unknown email dispatch failure",
      },
    });
    return { success: false, error: error?.message, id: notification.id };
  }
}

/**
 * Branded Corporate HTML Layout Wrapper
 */
function emailLayout(contentHtml: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070D18; color: #1e293b; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 6px; overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background-color: #0B1528; padding: 24px 32px; border-bottom: 2px solid #C59B27; }
          .logo-text { color: #ffffff; font-size: 18px; font-weight: 700; letter-spacing: 0.5px; margin: 0; }
          .subtitle { color: #C59B27; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
          .body { padding: 32px; font-size: 14px; line-height: 1.6; color: #334155; }
          .highlight-card { background: #FAF8F5; border: 1px solid #E2E8F0; border-left: 4px solid #C59B27; padding: 16px; border-radius: 4px; margin: 20px 0; }
          .footer { background: #080E1B; padding: 20px 32px; text-align: center; font-size: 11px; color: #94a3b8; }
          .footer a { color: #C59B27; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo-text">Vanguard Meridian Partners</h1>
            <div class="subtitle">Institutional Systems Advisory &bull; High-Consequence Architecture</div>
          </div>
          <div class="body">
            ${contentHtml}
          </div>
          <div class="footer">
            &copy; 2026 Vanguard Meridian Advisory & Engineering Corp.<br>
            One World Trade Center, Suite 7800, New York &bull; Bleicherweg 10, Paradeplatz, Zurich
          </div>
        </div>
      </body>
    </html>
  `;
}

// 1. INQUIRY / CONTACT NOTIFICATIONS
export async function sendInquiryAdminNotification(inquiry: {
  ticketNumber: string;
  name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  subject: string;
  message: string;
  inquiryType: string;
  id: string;
}) {
  const html = emailLayout(`
    <h2 style="color: #0B1528; font-size: 18px; margin-top: 0;">New Institutional Inquiry Received</h2>
    <p>A corporate stakeholder has submitted an advisory request through the portal:</p>
    
    <div class="highlight-card">
      <div style="font-size: 12px; color: #64748B; font-family: monospace;">TICKET: ${inquiry.ticketNumber}</div>
      <div style="font-size: 16px; font-weight: 700; color: #0B1528; margin: 6px 0;">${inquiry.subject}</div>
      <div style="margin-top: 8px;"><strong>Entity / Organization:</strong> ${inquiry.organization || "Direct Inquirer"}</div>
      <div><strong>Contact Person:</strong> ${inquiry.name}</div>
      <div><strong>Corporate Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></div>
      <div><strong>Telephone:</strong> ${inquiry.phone || "Not provided"}</div>
      <div><strong>Practice Domain:</strong> ${inquiry.inquiryType}</div>
    </div>

    <div style="margin-top: 16px;">
      <strong>Scope / Engagement Details:</strong>
      <p style="background: #F1F5F9; padding: 14px; border-radius: 4px; font-size: 13px; color: #1E293B; margin-top: 6px; white-space: pre-wrap;">${inquiry.message}</p>
    </div>

    <p style="font-size: 12px; color: #64748B; margin-top: 24px;">
      Log in to the <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/inquiries" style="color: #0B1528; font-weight: 600;">Administrative Console</a> to assign partner review.
    </p>
  `);

  return sendEmail({
    to: DEFAULT_CONTACT_TO_EMAIL,
    subject: `[Advisory Inquiry] ${inquiry.ticketNumber} - ${inquiry.organization || inquiry.name}`,
    html,
    notificationType: "INQUIRY_ADMIN_DISPATCH",
    inquiryId: inquiry.id,
  });
}

export async function sendInquiryClientConfirmation(inquiry: {
  ticketNumber: string;
  name: string;
  email: string;
  subject: string;
  inquiryType: string;
  id: string;
}) {
  const html = emailLayout(`
    <h2 style="color: #0B1528; font-size: 18px; margin-top: 0;">Inquiry Registered &bull; ${inquiry.ticketNumber}</h2>
    <p>Dear ${inquiry.name},</p>
    <p>Thank you for contacting Vanguard Meridian Partners. Your inquiry regarding <strong>"${inquiry.subject}"</strong> has been securely logged into our internal advisory dispatch queue.</p>
    
    <div class="highlight-card">
      <div><strong>Tracking Reference:</strong> ${inquiry.ticketNumber}</div>
      <div><strong>Practice Area:</strong> ${inquiry.inquiryType}</div>
      <div><strong>Confidentiality Protocol:</strong> Bilateral Mutual NDA / SOC2 Enclave</div>
    </div>

    <p>Our practice leads in New York and Zurich review submissions directly. A partner will reach out within one business day.</p>
    <p>Sincerely,<br><strong>Vanguard Meridian Practice Partners</strong></p>
  `);

  return sendEmail({
    to: inquiry.email,
    subject: `Inquiry Received [Ref: ${inquiry.ticketNumber}] - Vanguard Meridian Partners`,
    html,
    notificationType: "INQUIRY_CLIENT_CONFIRMATION",
    inquiryId: inquiry.id,
  });
}

// 2. APPOINTMENT NOTIFICATIONS
export async function sendAppointmentAdminNotification(appointment: {
  referenceNumber: string;
  customerName: string;
  email: string;
  organization?: string | null;
  phone?: string | null;
  selectedService: string;
  appointmentDate: string;
  appointmentTime: string;
  meetingType: string;
  message?: string | null;
  id: string;
}) {
  const html = emailLayout(`
    <h2 style="color: #0B1528; font-size: 18px; margin-top: 0;">Executive Consultation Request &bull; Action Required</h2>
    <p>A client has requested an advisory consultation slot:</p>
    
    <div class="highlight-card">
      <div style="font-size: 12px; color: #64748B; font-family: monospace;">BOOKING REF: ${appointment.referenceNumber}</div>
      <div style="font-size: 16px; font-weight: 700; color: #0B1528; margin: 6px 0;">${appointment.selectedService}</div>
      <div><strong>Client Name:</strong> ${appointment.customerName}</div>
      <div><strong>Institution:</strong> ${appointment.organization || "Not specified"}</div>
      <div><strong>Email:</strong> <a href="mailto:${appointment.email}">${appointment.email}</a></div>
      <div><strong>Date & Time Requested:</strong> ${appointment.appointmentDate} at ${appointment.appointmentTime}</div>
      <div><strong>Meeting Format:</strong> ${appointment.meetingType}</div>
      ${appointment.message ? `<div style="margin-top: 8px;"><strong>Context:</strong> ${appointment.message}</div>` : ""}
    </div>

    <p style="font-size: 12px; color: #64748B;">
      Please approve or reschedule in the <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/appointments" style="color: #0B1528; font-weight: 600;">Appointments Console</a>.
    </p>
  `);

  return sendEmail({
    to: DEFAULT_CONTACT_TO_EMAIL,
    subject: `[Consultation Request] ${appointment.referenceNumber} - ${appointment.organization || appointment.customerName}`,
    html,
    notificationType: "APPOINTMENT_ADMIN_REQUEST",
    appointmentId: appointment.id,
  });
}

export async function sendAppointmentClientConfirmation(appointment: {
  referenceNumber: string;
  customerName: string;
  email: string;
  selectedService: string;
  appointmentDate: string;
  appointmentTime: string;
  id: string;
}) {
  const html = emailLayout(`
    <h2 style="color: #0B1528; font-size: 18px; margin-top: 0;">Consultation Request Received [Pending Review]</h2>
    <p>Dear ${appointment.customerName},</p>
    <p>We have received your request for an executive advisory session on <strong>${appointment.selectedService}</strong>.</p>
    
    <div class="highlight-card">
      <div><strong>Booking Reference:</strong> ${appointment.referenceNumber}</div>
      <div><strong>Requested Window:</strong> ${appointment.appointmentDate} at ${appointment.appointmentTime}</div>
      <div><strong>Status:</strong> PENDING ADMINISTRATIVE CONFIRMATION</div>
    </div>

    <p>To ensure high-touch focus, our senior partners personally confirm all executive calendars. You will receive an official confirmation and calendar invite once approved.</p>
    <p>Sincerely,<br><strong>Executive Advisory Office &bull; Vanguard Meridian Partners</strong></p>
  `);

  return sendEmail({
    to: appointment.email,
    subject: `Consultation Slot Requested [Ref: ${appointment.referenceNumber}] - Vanguard Meridian`,
    html,
    notificationType: "APPOINTMENT_CLIENT_REQUEST",
    appointmentId: appointment.id,
  });
}

export async function sendAppointmentStatusUpdate(appointment: {
  referenceNumber: string;
  customerName: string;
  email: string;
  selectedService: string;
  appointmentDate: string;
  appointmentTime: string;
  status: "CONFIRMED" | "CANCELLED" | "RESCHEDULED";
  id: string;
}) {
  let statusHeadline = "";
  let statusMessage = "";

  if (appointment.status === "CONFIRMED") {
    statusHeadline = "Consultation Officially Confirmed";
    statusMessage = "Your consultation slot has been approved by the practice leadership. A secure video invite and calendar artifact have been scheduled.";
  } else if (appointment.status === "RESCHEDULED") {
    statusHeadline = "Consultation Time Updated";
    statusMessage = `Your consultation session has been adjusted to: ${appointment.appointmentDate} at ${appointment.appointmentTime}.`;
  } else {
    statusHeadline = "Consultation Request Update";
    statusMessage = "Your consultation booking has been cancelled or closed. Please contact advisory offices if you require further assistance.";
  }

  const html = emailLayout(`
    <h2 style="color: #0B1528; font-size: 18px; margin-top: 0;">${statusHeadline}</h2>
    <p>Dear ${appointment.customerName},</p>
    <p>${statusMessage}</p>
    
    <div class="highlight-card">
      <div><strong>Reference Number:</strong> ${appointment.referenceNumber}</div>
      <div><strong>Advisory Subject:</strong> ${appointment.selectedService}</div>
      <div><strong>Confirmed Date & Time:</strong> ${appointment.appointmentDate} at ${appointment.appointmentTime}</div>
      <div><strong>Status:</strong> ${appointment.status}</div>
    </div>

    <p>Sincerely,<br><strong>Vanguard Meridian Partners</strong></p>
  `);

  return sendEmail({
    to: appointment.email,
    subject: `[Status Update: ${appointment.status}] Consultation ${appointment.referenceNumber} - Vanguard Meridian`,
    html,
    notificationType: `APPOINTMENT_${appointment.status}`,
    appointmentId: appointment.id,
  });
}

// 3. REGISTRATION NOTIFICATION
export async function sendUserRegistrationAdminNotification(user: {
  name: string;
  email: string;
  company?: string | null;
}) {
  const html = emailLayout(`
    <h2 style="color: #0B1528; font-size: 18px; margin-top: 0;">New Client Portal Registration</h2>
    <p>A new corporate account profile has been registered on the client portal:</p>
    
    <div class="highlight-card">
      <div><strong>Legal Name:</strong> ${user.name}</div>
      <div><strong>Enterprise:</strong> ${user.company || "Not specified"}</div>
      <div><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></div>
      <div><strong>Timestamp:</strong> ${new Date().toUTCString()}</div>
    </div>
  `);

  return sendEmail({
    to: DEFAULT_CONTACT_TO_EMAIL,
    subject: `[Client Registration] ${user.company || user.name} (${user.email})`,
    html,
    notificationType: "USER_REGISTRATION_ADMIN",
  });
}

// 4. PASSWORD RESET
export async function sendPasswordResetEmail(user: {
  name: string;
  email: string;
  token: string;
}) {
  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/reset-password?token=${user.token}`;

  const html = emailLayout(`
    <h2 style="color: #0B1528; font-size: 18px; margin-top: 0;">Password Reset Authorization</h2>
    <p>Dear ${user.name},</p>
    <p>We received a request to reset your password for the Vanguard Meridian Client Portal. Click the button below to specify a new password:</p>
    
    <div style="text-align: center; margin: 28px 0;">
      <a href="${resetUrl}" style="background-color: #C59B27; color: #0B1528; font-weight: 700; padding: 12px 24px; border-radius: 4px; text-decoration: none; display: inline-block;">
        Reset Your Password
      </a>
    </div>

    <p style="font-size: 12px; color: #64748B;">
      This single-use cryptographic token expires in 1 hour. If you did not initiate this request, notify security immediately at <a href="mailto:security@vanguardmeridian.com">security@vanguardmeridian.com</a>.
    </p>
  `);

  return sendEmail({
    to: user.email,
    subject: `Password Reset Request - Vanguard Meridian Client Portal`,
    html,
    notificationType: "PASSWORD_RESET_TOKEN",
  });
}

