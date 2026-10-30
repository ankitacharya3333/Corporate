import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, Building2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
      <div className="bg-[#0B1528] py-4 px-6 border-b border-[#1E3352]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#16243B] border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27] font-bold text-sm">
              VM
            </div>
            <span className="font-semibold text-white tracking-wide text-sm">Vanguard Meridian</span>
          </Link>
          <span className="text-xs text-slate-400">Error 404 &bull; Resource Unlocated</span>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#F0ECE1] text-[#0B1528] flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8 text-[#8A6D1C]" />
        </div>
        <div className="text-xs font-mono font-bold text-[#8A6D1C] uppercase tracking-wider mb-2">
          HTTP 404 &bull; Specification Missing
        </div>
        <h1 className="text-3xl font-serif text-[#0B1528] mb-4">
          Specified Architecture Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-8">
          The requested route does not correspond to an authorized corporate briefing, practice specification, or administrative endpoint in this environment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded bg-[#0B1528] text-white text-xs font-semibold hover:bg-[#16243B] transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Return to Executive Home</span>
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-5 py-2.5 rounded bg-white border border-[#CBD5E1] text-[#0B1528] text-xs font-medium hover:bg-slate-50 transition-colors"
          >
            Review Advisory Practices
          </Link>
        </div>
      </div>

      <div className="py-6 text-center text-xs text-slate-400 border-t border-[#E2E8F0] bg-white">
        Vanguard Meridian Partners &bull; Technical Architecture Governance
      </div>
    </div>
  );
}
