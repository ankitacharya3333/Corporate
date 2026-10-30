import Link from "next/link";
import { Shield } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070D1A] text-slate-200 flex flex-col justify-between selection:bg-[#C59B27] selection:text-[#0B1528]">
      {/* Top Header */}
      <header className="border-b border-[#14233A] bg-[#0A1222] py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#16243B] border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27] font-bold text-sm">
              VM
            </div>
            <div>
              <span className="font-semibold text-white tracking-wide text-sm block">Vanguard Meridian</span>
              <span className="text-[10px] text-slate-400 block">Client Enclave Portal</span>
            </div>
          </Link>
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            &larr; Back to Public Firm Overview
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        {children}
      </main>

      {/* Footer Legal */}
      <footer className="border-t border-[#14233A] bg-[#050A14] py-4 px-6 text-center text-xs text-slate-500">
        <div>
          Authenticated Enterprise Session &bull; Strictly Monitored Boundary &bull; SOC2 Type II Certified
        </div>
      </footer>
    </div>
  );
}
