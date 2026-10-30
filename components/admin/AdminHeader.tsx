"use client";

import { Menu, Bell, Search, ShieldCheck, User } from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
}

export default function AdminHeader({ onOpenMobileMenu }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-[#0B1528] border-b border-[#16243B] flex items-center justify-between px-4 sm:px-6 z-20 text-slate-200">
      {/* Left side: mobile toggle & search */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded text-slate-400 hover:text-white hover:bg-[#16243B]"
          aria-label="Open administrative navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-xs hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search tickets, clients, practices..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white placeholder-slate-400 focus:outline-none focus:border-[#C59B27]"
          />
        </div>
      </div>

      {/* Right side: alerts, active profile */}
      <div className="flex items-center gap-4">
        {/* Security Enclave Status */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#16243B] border border-[#1E3352] text-[11px] text-[#C59B27]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>FIPS-140-3 Boundary Valid</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded text-slate-400 hover:text-white hover:bg-[#16243B] relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C59B27]" />
          </button>
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-3 pl-2 border-l border-[#1E3352]">
          <div className="w-8 h-8 rounded-full bg-[#16243B] border border-[#C59B27]/50 flex items-center justify-center text-[#C59B27] text-xs font-bold">
            MV
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-white leading-tight">Marcus Vance</div>
            <div className="text-[10px] text-slate-400 leading-tight">Principal Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}

