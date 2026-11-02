"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerLoginSchema, CustomerLoginData } from "@/lib/validations";
import { Lock, Eye, EyeOff, Loader2, CheckCircle, ShieldCheck, AlertCircle, Info } from "lucide-react";

function CustomerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || searchParams.get("from") || "/";
  const requiredMsg = searchParams.get("required") === "1";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerLoginData>({
    resolver: zodResolver(customerLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: CustomerLoginData) => {
    setLoading(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.error || "Authentication failed");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || "Invalid corporate credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0D192E] p-8 sm:p-10 rounded border border-[#1E3352] shadow-2xl">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C59B27] mb-2">
        <ShieldCheck className="w-4 h-4" />
        Client Access Enclave
      </div>
      <h1 className="text-2xl font-serif text-white mb-2">Client Portal Sign In</h1>
      <p className="text-xs text-slate-400 mb-6">
        Access confidential advisory deliverables, architecture repositories, and program telemetry.
      </p>

      {requiredMsg && (
        <div className="mb-5 p-3.5 rounded bg-[#16243B] border border-[#C59B27]/50 text-xs text-slate-200 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Authentication Required:</span> Please sign in or register to submit contact inquiries and book executive consultations. You will return to your destination automatically.
          </div>
        </div>
      )}

      {authError && (
        <div className="mb-4 p-3 rounded bg-red-950/70 border border-red-800 text-xs text-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      {success ? (
        <div className="p-6 rounded bg-[#16243B] border border-[#C59B27]/40 text-center space-y-3">
          <CheckCircle className="w-8 h-8 text-[#C59B27] mx-auto" />
          <h2 className="text-sm font-semibold text-white">Identity Verified</h2>
          <p className="text-xs text-slate-300">
            Secure HTTP-only session cookie established. Redirecting to your destination...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Authorized Corporate Email
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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-slate-300">
                Password
              </label>
              <Link href="/auth/forgot-password" className="text-[11px] text-[#C59B27] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter account password"
                className={`w-full px-3.5 py-2.5 text-xs rounded border bg-[#080E1B] text-white focus:outline-none focus:border-[#C59B27] pr-10 ${
                  errors.password ? "border-red-500" : "border-[#1E3352]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              {...register("rememberMe")}
              className="rounded border-[#1E3352] text-[#C59B27] bg-[#080E1B] focus:ring-0 mr-2"
            />
            <label htmlFor="remember" className="text-xs text-slate-400">
              Remember workstation for this session
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Credentials in Database...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Authenticate Session</span>
              </>
            )}
          </button>

          <div className="pt-4 text-center text-xs text-slate-400 border-t border-[#1E3352]">
            Need new client credentials?{" "}
            <Link
              href={callbackUrl ? `/auth/register?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/auth/register"}
              className="text-[#C59B27] font-semibold hover:underline"
            >
              Register corporate account
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default function CustomerLoginPage() {
  return (
    <Suspense fallback={<div className="text-white text-xs">Loading authentication enclave...</div>}>
      <CustomerLoginForm />
    </Suspense>
  );
}
