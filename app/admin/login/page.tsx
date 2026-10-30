"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginSchema, AdminLoginData } from "@/lib/validations";
import { ShieldAlert, Lock, Eye, EyeOff, Loader2, ArrowLeft, Terminal } from "lucide-react";

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
      email: "principal.admin@vanguardmeridian.internal",
      password: "",
    },
  });

  const onSubmit = (data: AdminLoginData) => {
    setLoading(true);
    setAuthError(null);

    // Phase 1: Validate input, allow mock sign-in into admin interface
    setTimeout(() => {
      setLoading(false);
      // Navigates directly into the admin dashboard UI
      router.push("/admin");
    }, 1000);
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
            Authorized personnel only. All access requests are cryptographically audited and recorded.
          </p>

          <div className="mb-6 p-3 rounded bg-[#16243B] border border-[#233B5F] text-[11px] text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#C59B27]">
              <Terminal className="w-3.5 h-3.5" />
              <span>Phase 1 UI Sandbox:</span>
            </div>
            <div>
              Enter any authorized format credentials to access the Administrative Dashboard interface. Real cryptographic session enforcement and multi-factor hardware keys attach in Phase 2.
            </div>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded bg-red-950/60 border border-red-800 text-xs text-red-300">
              {authError}
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
                placeholder="principal.admin@vanguardmeridian.internal"
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
                  Administrative Key / Passphrase
                </label>
                <span className="text-[10px] text-slate-400">Phase 2: Hardware FIDO2</span>
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
                  <span>Verifying Authorization...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Enter Admin Console</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-[#1E3352] text-center text-[11px] text-slate-400">
            Internal Systems Administration &bull; No Public Registration Available
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#14233A] bg-[#050A14] py-3 px-6 text-center text-[11px] text-slate-400">
        Confidential Management Subsystem &bull; Vanguard Meridian Advisory &bull; Unauthorized Entry Subject to Federal Prosecution
      </footer>
    </div>
  );
}

