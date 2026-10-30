"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  CalendarCheck,
  Users,
  Briefcase,
  Layers,
  FileText,
  Settings,
  Shield,
  LogOut,
  ChevronRight,
  ExternalLink
} from "lucide-react";

interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare, badge: "4 New" },
    { name: "Appointments", href: "/admin/appointments", icon: CalendarCheck, badge: "3" },
    { name: "Users & Clients", href: "/admin/users", icon: Users },
    { name: "Advisory Practices", href: "/admin/services", icon: Briefcase },
    { name: "Case Studies", href: "/admin/projects", icon: Layers },
    { name: "Insights & Blog", href: "/admin/blog", icon: FileText },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-[#080F1D] border-r border-[#16243B] text-slate-300">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-[#14233A] bg-[#060B14]">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#16243B] border border-[#C59B27] flex items-center justify-center text-[#C59B27] font-bold text-sm">
              VM
            </div>
            <div>
              <div className="text-white font-semibold text-xs tracking-wide">Vanguard Meridian</div>
              <div className="text-[10px] text-[#C59B27] uppercase tracking-wider font-mono">Console v1.0 [P1]</div>
            </div>
          </Link>
        </div>

        {/* Navigation items */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Administrative Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded text-xs font-medium transition-colors ${
                  active
                    ? "bg-[#16243B] text-white font-semibold border-l-2 border-[#C59B27]"
                    : "text-slate-300 hover:text-white hover:bg-[#101D33]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? "text-[#C59B27]" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#C59B27]/20 text-[#C59B27] border border-[#C59B27]/30 font-mono">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer controls & switch to public */}
      <div className="p-4 border-t border-[#14233A] bg-[#060B14] space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded bg-[#101D33] text-slate-300 hover:text-white text-xs border border-[#1E3352]"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>View Live Site</span>
          </div>
          <ChevronRight className="w-3 h-3 text-slate-400" />
        </Link>

        <div className="flex items-center justify-between px-2 pt-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-slate-400">Node: NYC-DC-01</span>
          </div>
          <Link href="/admin/login" className="text-slate-400 hover:text-red-400" title="Exit Session">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={onClose} />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85%] z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

