"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentFormSchema, AppointmentFormData } from "@/lib/validations";
import { SERVICES_DATA } from "@/lib/data";
import { Calendar, Clock, Video, Building2, Phone, CheckCircle2, Loader2, Shield } from "lucide-react";

export default function AppointmentPage() {
  const [submitted, setSubmitted] = useState<AppointmentFormData | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      company: "",
      serviceInterest: "",
      meetingType: "Video Conference (Teams/Zoom)",
      preferredDate: "",
      preferredTime: "10:00 AM EST",
      projectScopeBrief: "",
    },
  });

  const onSubmit = (data: AppointmentFormData) => {
    setLoading(true);
    setTimeout(() => {
      setSubmitted(data);
      setLoading(false);
      reset();
    }, 1200);
  };

  return (
    <div className="bg-[#FAF8F5]">
      {/* Header */}
      <section className="bg-[#0B1528] text-white py-16 border-b border-[#1E3352]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#C59B27] uppercase tracking-widest mb-3">
              Executive Consultation Booking
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight">
              Schedule an executive advisory session.
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Engage directly with our practice partners to evaluate system topologies, compliance obligations, or platform modernizations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded border border-[#E2E8F0] shadow-sm">
            <div className="mb-6 p-3 rounded bg-[#FAF8F5] border border-[#CBD5E1] text-[11px] text-[#475569] flex items-start gap-2">
              <span className="font-bold text-[#0B1528] shrink-0">[Phase 1 Interface]:</span>
              <span>Validates corporate schedule requests and simulates administrative booking dispatch awaiting calendar sync in Phase 2.</span>
            </div>

            {submitted ? (
              <div className="p-8 rounded bg-[#F0FDF4] border border-[#86EFAC] text-[#14532D] space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-[#16A34A] shrink-0" />
                  <div>
                    <h2 className="text-lg font-serif font-bold">Advisory Request Registered</h2>
                    <p className="text-xs text-[#15803D]">
                      Reference booking slot held for partner review.
                    </p>
                  </div>
                </div>

                <div className="bg-white/90 p-4 rounded border border-[#BBF7D0] text-xs space-y-2 text-[#0B1528]">
                  <div><strong>Client:</strong> {submitted.fullName} ({submitted.company})</div>
                  <div><strong>Email:</strong> {submitted.workEmail}</div>
                  <div><strong>Practice Area:</strong> {submitted.serviceInterest}</div>
                  <div><strong>Requested Date & Window:</strong> {submitted.preferredDate} at {submitted.preferredTime}</div>
                  <div><strong>Session Format:</strong> {submitted.meetingType}</div>
                </div>

                <div className="text-xs text-slate-600">
                  During Phase 2, this will issue automated ICS calendar holds and mutual NDA counter-signatures.
                </div>

                <button
                  onClick={() => setSubmitted(null)}
                  className="mt-2 text-xs font-semibold text-[#166534] underline hover:text-[#14532D]"
                >
                  Schedule Another Consultation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#1E293B] mb-1">
                      Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("fullName")}
                      placeholder="e.g. Frederik Lindqvist"
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
                      Corporate Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("workEmail")}
                      placeholder="name@enterprise.com"
                      className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#FAF8F5] text-[#0B1528] focus:bg-white focus:outline-none focus:border-[#C59B27] ${
                        errors.workEmail ? "border-red-500" : "border-[#CBD5E1]"
                      }`}
                    />
                    {errors.workEmail && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.workEmail.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#1E293B] mb-1">
                      Enterprise / Institution Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("company")}
                      placeholder="e.g. Nordic Intermodal Transport"
                      className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#FAF8F5] text-[#0B1528] focus:bg-white focus:outline-none focus:border-[#C59B27] ${
                        errors.company ? "border-red-500" : "border-[#CBD5E1]"
                      }`}
                    />
                    {errors.company && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.company.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E293B] mb-1">
                      Primary Advisory Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("serviceInterest")}
                      className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#FAF8F5] text-[#0B1528] focus:bg-white focus:outline-none focus:border-[#C59B27] ${
                        errors.serviceInterest ? "border-red-500" : "border-[#CBD5E1]"
                      }`}
                    >
                      <option value="">Select practice area...</option>
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title}
                        </option>
                      ))}
                      <option value="General Board / Executive Advisory">General Board / Executive Advisory</option>
                    </select>
                    {errors.serviceInterest && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.serviceInterest.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1E293B] mb-2">
                    Consultation Format <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 p-3 rounded border border-[#CBD5E1] bg-[#FAF8F5] text-xs cursor-pointer hover:bg-white">
                      <input
                        type="radio"
                        value="Video Conference (Teams/Zoom)"
                        {...register("meetingType")}
                        className="text-[#C59B27]"
                      />
                      <span>Secure Video Call</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 rounded border border-[#CBD5E1] bg-[#FAF8F5] text-xs cursor-pointer hover:bg-white">
                      <input
                        type="radio"
                        value="On-Site Executive Briefing"
                        {...register("meetingType")}
                        className="text-[#C59B27]"
                      />
                      <span>On-Site (NYC / Zurich)</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 rounded border border-[#CBD5E1] bg-[#FAF8F5] text-xs cursor-pointer hover:bg-white">
                      <input
                        type="radio"
                        value="Phone Consultation"
                        {...register("meetingType")}
                        className="text-[#C59B27]"
                      />
                      <span>Direct Executive Line</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#1E293B] mb-1">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("preferredDate")}
                      className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#FAF8F5] text-[#0B1528] focus:bg-white focus:outline-none focus:border-[#C59B27] ${
                        errors.preferredDate ? "border-red-500" : "border-[#CBD5E1]"
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.preferredDate.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E293B] mb-1">
                      Preferred Time Window <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("preferredTime")}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-[#CBD5E1] bg-[#FAF8F5] text-[#0B1528] focus:bg-white focus:outline-none focus:border-[#C59B27]"
                    >
                      <option value="09:00 AM EST / 15:00 CET">09:00 AM EST / 15:00 CET (Morning Session)</option>
                      <option value="11:30 AM EST / 17:30 CET">11:30 AM EST / 17:30 CET (Midday Session)</option>
                      <option value="02:30 PM EST / 20:30 CET">02:30 PM EST / 20:30 CET (Afternoon Session)</option>
                      <option value="04:30 PM EST">04:30 PM EST (Late Session)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1E293B] mb-1">
                    Brief Summary of Program or Architecture Scope <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    {...register("projectScopeBrief")}
                    placeholder="Outline high-level objectives, timeline pressures, or compliance considerations..."
                    className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#FAF8F5] text-[#0B1528] focus:bg-white focus:outline-none focus:border-[#C59B27] ${
                      errors.projectScopeBrief ? "border-red-500" : "border-[#CBD5E1]"
                    }`}
                  />
                  {errors.projectScopeBrief && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.projectScopeBrief.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Consultation Request...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Consultation Slot</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Consultation Protocol Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B1528] text-white p-6 rounded border border-[#1E3352] space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#C59B27] flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Briefing Protocol
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Consultations are held directly with senior partners. Prior to meeting, we provide our standard unilateral NDA or accept your institutional equivalent.
              </p>
              <div className="border-t border-[#1E3352] pt-3 text-[11px] text-slate-400 space-y-1.5">
                <div>&bull; Duration: 45 minutes focused executive review</div>
                <div>&bull; Deliverable: Initial scoping memo & assessment fit</div>
                <div>&bull; No marketing pitches or junior staffing</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded border border-[#E2E8F0] shadow-xs text-xs text-[#475569] space-y-3">
              <div className="font-semibold text-[#0B1528]">Physical Meeting Locations:</div>
              <div>
                <strong>New York:</strong> One World Trade Center, Suite 7800
              </div>
              <div>
                <strong>Zurich:</strong> Bleicherweg 10, Paradeplatz
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
