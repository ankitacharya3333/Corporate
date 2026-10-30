"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordData } from "@/lib/validations";
import { Mail, Loader2, ArrowLeft, CheckCircle2, Shield } from "lucide-react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ForgotPasswordData) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmittedEmail(data.email);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md bg-[#0D192E] p-8 sm:p-10 rounded border border-[#1E3352] shadow-2xl">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C59B27] mb-2">
        <Shield className="w-4 h-4" />
        Credential Recovery
      </div>
      <h1 className="text-2xl font-serif text-white mb-2">Reset Password</h1>
      <p className="text-xs text-slate-400 mb-6">
        Enter your authorized corporate email to receive cryptographic password reset instructions.
      </p>

      {/* Phase 1 Integration Banner */}
      <div className="mb-6 p-3 rounded bg-[#16243B] border border-[#233B5F] text-[11px] text-slate-300">
        <span className="font-bold text-[#C59B27]">[Phase 1 Interface]:</span> Validates email formatting and simulates delivery workflow. Live SMTP and expiring tokens will be connected in Phase 2.
      </div>

      {submittedEmail ? (
        <div className="p-6 rounded bg-[#16243B] border border-[#C59B27]/40 text-center space-y-4">
          <CheckCircle2 className="w-8 h-8 text-[#C59B27] mx-auto" />
          <h2 className="text-sm font-semibold text-white">Recovery Token Queued</h2>
          <p className="text-xs text-slate-300">
            If <strong className="text-white">{submittedEmail}</strong> matches an active account, verification instructions will be transmitted.
          </p>
          <div className="pt-2">
            <Link
              href="/auth/reset-password"
              className="text-xs text-[#C59B27] underline block font-medium"
            >
              [Demo Flow]: Test Password Reset Form &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Registered Corporate Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="e.sterling@enterprise.com"
              className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#080E1B] text-white focus:outline-none focus:border-[#C59B27] ${
                errors.email ? "border-red-500" : "border-[#1E3352]"
              }`}
            />
            {errors.email && (
              <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Checking Registry...</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                <span>Send Reset Link</span>
              </>
            )}
          </button>

          <div className="pt-4 text-center text-xs text-slate-400 border-t border-[#1E3352]">
            <Link href="/auth/login" className="hover:text-white inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Client Sign In</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
