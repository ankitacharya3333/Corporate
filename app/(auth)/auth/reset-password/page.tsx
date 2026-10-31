"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordData } from "@/lib/validations";
import { KeyRound, Loader2, CheckCircle2, Shield, AlertCircle } from "lucide-react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) {
      setErrorMessage("Missing password reset token in URL. Please use the link provided in your email.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password, confirmPassword: data.confirmPassword }),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Failed to update password.");
      }

      setCompleted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
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

      {errorMessage && (
        <div className="mb-4 p-3 rounded bg-red-950/70 border border-red-800 text-xs text-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {completed ? (
        <div className="p-6 rounded bg-[#16243B] border border-[#C59B27]/40 text-center space-y-4">
          <CheckCircle2 className="w-10 h-10 text-[#C59B27] mx-auto" />
          <h2 className="text-sm font-semibold text-white">Password Updated in Database</h2>
          <p className="text-xs text-slate-300">
            Your new hash has been stored. You may now sign in to your account.
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
                <span>Hashing & Updating Record...</span>
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-white text-xs">Loading token...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
