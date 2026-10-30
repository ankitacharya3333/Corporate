"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordData } from "@/lib/validations";
import { KeyRound, Loader2, CheckCircle2, Shield } from "lucide-react";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordData) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md bg-[#0D192E] p-8 sm:p-10 rounded border border-[#1E3352] shadow-2xl">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C59B27] mb-2">
        <Shield className="w-4 h-4" />
        Security Credential Update
      </div>
      <h1 className="text-2xl font-serif text-white mb-2">Set New Password</h1>
      <p className="text-xs text-slate-400 mb-6">
        Specify a compliant passphrase meeting corporate entropy standards.
      </p>

      {/* Phase 1 Integration Banner */}
      <div className="mb-6 p-3 rounded bg-[#16243B] border border-[#233B5F] text-[11px] text-slate-300">
        <span className="font-bold text-[#C59B27]">[Phase 1 Interface]:</span> Validates token submission UI and entropy rules. Live token consumption connects in Phase 2.
      </div>

      {completed ? (
        <div className="p-6 rounded bg-[#16243B] border border-[#C59B27]/40 text-center space-y-4">
          <CheckCircle2 className="w-10 h-10 text-[#C59B27] mx-auto" />
          <h2 className="text-sm font-semibold text-white">Password Updated Successfully</h2>
          <p className="text-xs text-slate-300">
            Your new access credentials have satisfied all front-end complexity requirements.
          </p>
          <Link
            href="/auth/login"
            className="inline-block px-5 py-2 rounded bg-[#C59B27] text-[#0B1528] text-xs font-bold"
          >
            Sign In with New Password
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Minimum 8 characters"
              className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#080E1B] text-white focus:outline-none focus:border-[#C59B27] ${
                errors.password ? "border-red-500" : "border-[#1E3352]"
              }`}
            />
            {errors.password && (
              <p className="text-[11px] text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Re-enter password"
              className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#080E1B] text-white focus:outline-none focus:border-[#C59B27] ${
                errors.confirmPassword ? "border-red-500" : "border-[#1E3352]"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-[11px] text-red-400 mt-1">{errors.confirmPassword.message}</p>
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
                <span>Enforcing Entropy...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Confirm Passphrase</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
