"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerRegisterSchema, CustomerRegisterData } from "@/lib/validations";
import { UserPlus, Loader2, CheckCircle2, Shield, AlertCircle, Info } from "lucide-react";

function CustomerRegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || searchParams.get("from") || "/";

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerRegisterData>({
    resolver: zodResolver(customerRegisterSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: CustomerRegisterData) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.error || "Failed to register corporate account.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred during account registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-[#0D192E] p-8 sm:p-10 rounded border border-[#1E3352] shadow-2xl">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C59B27] mb-2">
        <Shield className="w-4 h-4" />
        Client Onboarding
      </div>
      <h1 className="text-2xl font-serif text-white mb-2">Register Client Portal</h1>
      <p className="text-xs text-slate-400 mb-6">
        Create an authorized organization profile to collaborate on architecture blueprints and review SOWs.
      </p>

      {callbackUrl !== "/" && (
        <div className="mb-5 p-3.5 rounded bg-[#16243B] border border-[#C59B27]/50 text-xs text-slate-200 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
          <div>
            Creating an account will immediately authenticate your session and return you to your consultation or inquiry request.
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 rounded bg-red-950/70 border border-red-800 text-xs text-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {success ? (
        <div className="p-6 rounded bg-[#16243B] border border-[#C59B27]/40 text-center space-y-4">
          <CheckCircle2 className="w-10 h-10 text-[#C59B27] mx-auto" />
          <h2 className="text-base font-semibold text-white">Account Created Successfully</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your corporate profile has been stored in PostgreSQL. Session cookie has been generated. Redirecting to firm portal...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("fullName")}
                placeholder="Eleanor Sterling"
                className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#080E1B] text-white focus:outline-none focus:border-[#C59B27] ${
                  errors.fullName ? "border-red-500" : "border-[#1E3352]"
                }`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-red-400 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Enterprise Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("company")}
                placeholder="Sterling Private Capital"
                className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#080E1B] text-white focus:outline-none focus:border-[#C59B27] ${
                  errors.company ? "border-red-500" : "border-[#1E3352]"
                }`}
              />
              {errors.company && (
                <p className="text-[11px] text-red-400 mt-1">{errors.company.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Corporate Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="name@enterprise.com"
              className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#080E1B] text-white focus:outline-none focus:border-[#C59B27] ${
                errors.email ? "border-red-500" : "border-[#1E3352]"
              }`}
            />
            {errors.email && (
              <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Min 8 characters"
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
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Repeat password"
                className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#080E1B] text-white focus:outline-none focus:border-[#C59B27] ${
                  errors.confirmPassword ? "border-red-500" : "border-[#1E3352]"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-[11px] text-red-400 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("agreeTerms")}
                className="mt-0.5 rounded border-[#1E3352] text-[#C59B27] bg-[#080E1B] focus:ring-0"
              />
              <span className="text-xs text-slate-400">
                I acknowledge the <Link href="/terms" className="text-[#C59B27] underline">Terms of Advisory Engagement</Link> and <Link href="/privacy" className="text-[#C59B27] underline">Confidentiality Protocol</Link>.
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-[11px] text-red-400 mt-1">{errors.agreeTerms.message}</p>
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
                <span>Storing Account & Hash in PostgreSQL...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Submit Client Account Request</span>
              </>
            )}
          </button>

          <div className="pt-4 text-center text-xs text-slate-400 border-t border-[#1E3352]">
            Already hold active credentials?{" "}
            <Link
              href={callbackUrl ? `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/auth/login"}
              className="text-[#C59B27] font-semibold hover:underline"
            >
              Access sign in
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default function CustomerRegisterPage() {
  return (
    <Suspense fallback={<div className="text-white text-xs">Loading onboarding enclave...</div>}>
      <CustomerRegisterForm />
    </Suspense>
  );
}
