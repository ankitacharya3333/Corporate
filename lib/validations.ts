import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid corporate email address"),
  organization: z.string().min(2, "Organization name is required"),
  phone: z.string().optional(),
  serviceInterest: z.string().min(1, "Please select an area of engagement"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Please provide at least 20 characters detailing your inquiry"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const appointmentFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  workEmail: z.string().email("Valid corporate email required"),
  company: z.string().min(2, "Company name is required"),
  serviceInterest: z.string().min(1, "Please select an advisory domain"),
  meetingType: z.string().min(1, "Select meeting format"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select an executive window"),
  projectScopeBrief: z.string().min(15, "Brief context of your engagement requirements is needed"),
});

export type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

export const customerLoginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

export type CustomerLoginData = z.infer<typeof customerLoginSchema>;

export const customerRegisterSchema = z.object({
  fullName: z.string().min(2, "Full legal name required"),
  company: z.string().min(2, "Organization name required"),
  email: z.string().email("Valid business email required"),
  password: z.string().min(8, "Password must be at least 8 characters with at least one number"),
  confirmPassword: z.string().min(8, "Confirm your password"),
  agreeTerms: z.boolean().refine((val) => val === true, "You must agree to the Terms of Engagement"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type CustomerRegisterData = z.infer<typeof customerRegisterSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter your registered corporate email"),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email("Enter authorized administrative credentials"),
  password: z.string().min(8, "Password required"),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;

export const serviceFormSchema = z.object({
  title: z.string().min(3, "Title is required"),
  category: z.enum([
    "Strategic Advisory",
    "Systems Engineering",
    "Enterprise Security",
    "Digital Transformation",
    "Data & Intelligence"
  ]),
  shortDescription: z.string().min(20, "Short description must be at least 20 characters"),
  fullDescription: z.string().min(50, "Full description must provide sufficient detail"),
  leadTime: z.string().min(2, "Estimated timeframe required"),
  published: z.boolean(),
});

export type ServiceFormData = z.infer<typeof serviceFormSchema>;

export const projectFormSchema = z.object({
  title: z.string().min(3, "Project title required"),
  clientIndustry: z.string().min(3, "Industry classification required"),
  timeline: z.string().min(2, "Timeline required"),
  summary: z.string().min(30, "Project summary required"),
  challenge: z.string().min(30, "Challenge description required"),
  approach: z.string().min(30, "Solution approach required"),
  published: z.boolean(),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

export const blogPostFormSchema = z.object({
  title: z.string().min(5, "Article title is required"),
  category: z.enum([
    "Architecture",
    "Governance",
    "Cloud Strategy",
    "Cyber Resilience",
    "Applied AI"
  ]),
  summary: z.string().min(20, "Summary must be concise and informative"),
  content: z.string().min(100, "Content must be substantial"),
  readTime: z.string().min(2, "Reading time estimate required (e.g. 5 min read)"),
  status: z.enum(["published", "draft"]),
});

export type BlogPostFormData = z.infer<typeof blogPostFormSchema>;

