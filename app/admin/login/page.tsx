"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginSchema, AdminLoginData } from "@/lib/validations";
import { ShieldAlert, Lock, Eye, EyeOff, Loader2, ArrowLeft, Terminal, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "rmnrr333@gmail.com",
      password: "",
    },
  });

  const onSubmit = async (data: AdminLoginData) => {
    setLoading(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.error || "Authentication failed");
      }

      // Successful verified session cookie set
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || "Invalid administrative credentials or unauthorized role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070D18] flex flex-col justify-between text-slate-200">
      {/* Header */}
      <header className="border-b border-[#14233A] bg-[#091122] py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#16243B] border border-[#C59B27] flex items-center justify-center text-[#C59B27] font-bold text-sm">
            VM
          </div>
          <div>
            <span className="text-white font-semibold text-sm block">Vanguard Meridian Partners</span>
            <span className="text-[10px] text-slate-400 block font-mono">Administrative Control Console &bull; Internal Gateway</span>
          </div>
        </div>
        <Link href="/" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Public Portal</span>
        </Link>
      </header>

      {/* Main Form */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-[#0D172A] p-8 sm:p-10 rounded border border-[#1E3352] shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C59B27] mb-2">
            <ShieldAlert className="w-4 h-4 text-[#C59B27]" />
            Restricted Administrative Access
          </div>
          <h1 className="text-2xl font-serif text-white mb-2">Internal Admin Console</h1>
          <p className="text-xs text-slate-400 mb-6">
            Authorized personnel only. Authenticates against the PostgreSQL database with server-side HTTP-only session cookies.
          </p>

          {authError && (
            <div className="mb-4 p-3 rounded bg-red-950/70 border border-red-800 text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Administrative Identity (Internal Email)
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="rmnrr333@gmail.com"
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
                  Administrative Passphrase
                </label>
                <span className="text-[10px] text-slate-400">BCrypt + JOSE Verified</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter administrator passphrase"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials & Session...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-[#1E3352] text-center text-[11px] text-slate-400">
            Internal Systems Administration &bull; No Public Registration Permitted
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#14233A] bg-[#050A14] py-3 px-6 text-center text-[11px] text-slate-400">
        Confidential Management Subsystem &bull; Vanguard Meridian Advisory &bull; Unauthorized Entry Subject to Prosecution
      </footer>
    </div>
  );
}
