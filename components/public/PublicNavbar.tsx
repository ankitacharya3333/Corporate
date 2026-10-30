"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Shield, ChevronRight, PhoneCall, Building2 } from "lucide-react";

export default function PublicNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Advisory & Services", href: "/services" },
    { name: "Case Studies", href: "/projects" },
    { name: "Insights", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B1528] text-white border-b border-[#1E3352] shadow-sm">
      {/* Top utility sub-bar */}
      <div className="hidden lg:block bg-[#070D1A] border-b border-[#14233A] text-xs text-slate-300 py-1.5 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-[#C59B27]" />
              New York &bull; Zurich &bull; Institutional Systems Advisory
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-400">Regulated Entity Resilience &bull; High-Consequence Architecture</span>
          </div>
          <div className="flex items-center space-x-5">
            <Link href="/auth/login" className="hover:text-white transition-colors">
              Client Portal
            </Link>
            <span className="text-slate-500">|</span>
            <Link href="/admin/login" className="hover:text-[#C59B27] transition-colors flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#C59B27]" />
              Internal Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-[#1E3352] to-[#0D1B33] border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27] font-bold text-xl shadow-inner group-hover:border-[#C59B27] transition-colors">
              V<span className="text-white text-xs font-normal">M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg tracking-wide text-white group-hover:text-[#F0ECE1] transition-colors">
                Vanguard Meridian
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-400">
                Partners &bull; Advisory Corp
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded transition-all duration-150 ${
                    active
                      ? "text-[#C59B27] bg-[#16243B] font-semibold border-b-2 border-[#C59B27]"
                      : "text-slate-200 hover:text-white hover:bg-[#14233A]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] text-sm font-semibold tracking-wide transition-all duration-150 shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              Book Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-3">
            <Link
              href="/appointment"
              className="text-xs px-2.5 py-1.5 rounded bg-[#C59B27] text-[#0B1528] font-medium"
            >
              Consultation
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-slate-300 hover:text-white hover:bg-[#16243B] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D192E] border-b border-[#1E3352] px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded text-base font-medium ${
                isActive(link.href)
                  ? "bg-[#16243B] text-[#C59B27] font-semibold"
                  : "text-slate-200 hover:bg-[#14233A]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#1E3352] space-y-2">
            <Link
              href="/appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded bg-[#C59B27] text-[#0B1528] font-semibold text-sm"
            >
              <span>Schedule Advisory Session</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 px-3 rounded bg-[#16243B] text-slate-200 text-xs hover:text-white"
              >
                Client Portal
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 px-3 rounded bg-[#16243B] text-[#C59B27] text-xs hover:text-white flex items-center justify-center gap-1"
              >
                <Shield className="w-3 h-3" />
                Admin System
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

