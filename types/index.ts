export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: "Strategic Advisory" | "Systems Engineering" | "Enterprise Security" | "Digital Transformation" | "Data & Intelligence";
  capabilities: string[];
  deliverables: string[];
  leadTime: string;
  featured: boolean;
  published: boolean;
  status: "active" | "draft" | "archived";
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  clientIndustry: string;
  timeline: string;
  summary: string;
  challenge: string;
  approach: string;
  outcomes: { metric: string; label: string }[];
  tags: string[];
  featured: boolean;
  published: boolean;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: "Architecture" | "Governance" | "Cloud Strategy" | "Cyber Resilience" | "Applied AI";
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  status: "published" | "draft";
}

export interface InquiryItem {
  id: string;
  ticketNumber: string;
  name: string;
  email: string;
  organization: string;
  phone?: string;
  subject: string;
  message: string;
  serviceInterest: string;
  submittedAt: string;
  status: "new" | "in_review" | "contacted" | "resolved";
  priority: "low" | "medium" | "high";
}

export interface AppointmentItem {
  id: string;
  bookingRef: string;
  clientName: string;
  clientEmail: string;
  organization: string;
  serviceRequested: string;
  preferredDate: string;
  preferredTime: string;
  status: "pending" | "confirmed" | "completed" | "rescheduled" | "cancelled";
  meetingType: "Video Conference (Teams/Zoom)" | "On-Site Executive Briefing" | "Phone Consultation";
  notes?: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  joinedDate: string;
  status: "active" | "invited" | "suspended";
  tier: "Enterprise" | "Advisory Partner" | "Standard";
}
