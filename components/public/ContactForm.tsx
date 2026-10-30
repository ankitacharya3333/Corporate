"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "@/lib/validations";
import { SERVICES_DATA } from "@/lib/data";
import { Send, CheckCircle2, AlertCircle, Loader2, Shield } from "lucide-react";

export default function ContactForm() {
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      organization: "",
      phone: "",
      serviceInterest: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionState("submitting");

    // Phase 1: Simulate network verification with realistic state management
    setTimeout(() => {
      setSubmittedData(data);
      setSubmissionState("success");
      reset();
    }, 1200);
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded border border-[#E2E8F0] shadow-sm">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A6D1C] mb-2">
        <Shield className="w-4 h-4 text-[#C59B27]" />
        Confidential Inquiry Gateway
      </div>
      <h2 className="text-2xl font-serif text-[#0B1528] mb-2">Direct Practice Inquiry</h2>
      <p className="text-xs text-[#64748B] mb-8">
        Submissions are routed directly to practice partners. Handled under standard mutual non-disclosure protocols.
      </p>

      {/* Phase 1 Integration Banner */}
      <div className="mb-6 p-3 rounded bg-[#FAF8F5] border border-[#CBD5E1] text-[11px] text-[#475569] flex items-start gap-2">
        <span className="font-bold text-[#0B1528] shrink-0">[Phase 1 Interface]:</span>
        <span>Validates schema adherence & mock-generates an internal review dispatch ticket awaiting Phase 2 persistent backend integration.</span>
      </div>

      {submissionState === "success" && submittedData ? (
        <div className="p-6 rounded bg-[#F0FDF4] border border-[#86EFAC] text-[#14532D] space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#16A34A] shrink-0" />
            <div>
              <h3 className="font-bold text-sm">Inquiry Validation Successful</h3>
              <p className="text-xs text-[#15803D]">
                Your communication has been formally structured and validated.
              </p>
            </div>
          </div>
          <div className="text-xs bg-white/80 p-3 rounded border border-[#BBF7D0] space-y-1">
            <div><strong>Sender:</strong> {submittedData.fullName} ({submittedData.organization})</div>
            <div><strong>Routing:</strong> {submittedData.serviceInterest}</div>
            <div><strong>Assigned Channel:</strong> Practice Lead Direct Dispatch (Phase 2 Queued)</div>
          </div>
          <button
            onClick={() => setSubmissionState("idle")}
            className="text-xs underline font-semibold text-[#166534] hover:text-[#14532D]"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-[#1E293B] mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("fullName")}
                placeholder="e.g. Eleanor Sterling"
                className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#FAF8F5] text-[#0B1528] focus:bg-white focus:outline-none focus:border-[#C59B27] ${
                  errors.fullName ? "border-red-500" : "border-[#CBD5E1]"
                }`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-red-600 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1E293B] mb-1">
                Corporate Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="name@organization.com"
                className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#FAF8F5] text-[#0B1528] focus:bg-white focus:outline-none focus:border-[#C59B27] ${
                  errors.email ? "border-red-500" : "border-[#CBD5E1]"
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-[#1E293B] mb-1">
                Entity / Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("organization")}
                placeholder="e.g. Apex Clearing Holdings"
                className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#FAF8F5] text-[#0B1528] focus:bg-white focus:outline-none focus:border-[#C59B27] ${
                  errors.organization ? "border-red-500" : "border-[#CBD5E1]"
                }`}
              />
              {errors.organization && (
                <p className="text-[11px] text-red-600 mt-1">{errors.organization.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1E293B] mb-1">
                Direct Telephone (Optional)
              </label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="+1 (212) 555-0199"
                className="w-full px-3.5 py-2.5 text-xs rounded border border-[#CBD5E1] bg-[#FAF8F5] text-[#0B1528] focus:bg-white focus:outline-none focus:border-[#C59B27]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#1E293B] mb-1">
              Advisory Practice Area <span className="text-red-500">*</span>
            </label>
            <select
              {...register("serviceInterest")}
              className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#FAF8F5] text-[#0B1528] focus:bg-white focus:outline-none focus:border-[#C59B27] ${
                errors.serviceInterest ? "border-red-500" : "border-[#CBD5E1]"
              }`}
            >
              <option value="">Select practice domain...</option>
              {SERVICES_DATA.map((srv) => (
                <option key={srv.id} value={srv.title}>
                  {srv.title}
                </option>
              ))}
              <option value="General Executive Inquiry">General Executive Advisory / Board Consultation</option>
            </select>
            {errors.serviceInterest && (
              <p className="text-[11px] text-red-600 mt-1">{errors.serviceInterest.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#1E293B] mb-1">
              Subject Line <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("subject")}
              placeholder="e.g. Q1 Infrastructure Resilience Review & DORA Assessment"
              className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#FAF8F5] text-[#0B1528] focus:bg-white focus:outline-none focus:border-[#C59B27] ${
                errors.subject ? "border-red-500" : "border-[#CBD5E1]"
              }`}
            />
            {errors.subject && (
              <p className="text-[11px] text-red-600 mt-1">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#1E293B] mb-1">
              Engagement Context & Technical Overview <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              {...register("message")}
              placeholder="Please provide details regarding current topology, institutional objectives, and compliance constraints..."
              className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#FAF8F5] text-[#0B1528] focus:bg-white focus:outline-none focus:border-[#C59B27] ${
                errors.message ? "border-red-500" : "border-[#CBD5E1]"
              }`}
            />
            {errors.message && (
              <p className="text-[11px] text-red-600 mt-1">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submissionState === "submitting"}
            className="w-full py-3 px-6 rounded bg-[#0B1528] hover:bg-[#16243B] disabled:bg-slate-400 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
          >
            {submissionState === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#C59B27]" />
                <span>Transmitting Encrypted Payload...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#C59B27]" />
                <span>Transmit Formal Inquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

