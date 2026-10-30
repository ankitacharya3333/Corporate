import Link from "next/link";
import { COMPANY_PROFILE, SERVICES_DATA } from "@/lib/data";
import { ShieldCheck, Mail, Phone, MapPin, ArrowUpRight, Lock } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="bg-[#080E1B] text-slate-300 border-t border-[#16243B]">
      {/* Upper strategic reassurance banner */}
      <div className="border-b border-[#14233A] bg-[#0A1222] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#16243B] flex items-center justify-center text-[#C59B27] shrink-0 border border-[#1E3352]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">Regulatory Compliance & High-Assurance Practice</h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Engagements conducted under stringent bilateral NDAs, SOC2 / DORA frameworks, and sovereign enclave protocols.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/appointment"
                className="text-xs px-4 py-2 rounded bg-[#C59B27] text-[#0B1528] font-semibold hover:bg-[#B38A1F] transition-colors"
              >
                Request Confidential Briefing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#16243B] border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27] font-bold text-lg">
                VM
              </div>
              <div>
                <div className="text-white font-semibold tracking-wide text-base">{COMPANY_PROFILE.name}</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">{COMPANY_PROFILE.legalName}</div>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Specialized technology architecture and systems resilience advisory for institutional leadership, capital markets operators, and critical infrastructure entities.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>Established: {COMPANY_PROFILE.founded} &bull; Entity Registration: Zurich & New York</div>
              <div>Operating Standard: Zero-Trust Engineering &bull; Independent Architectural Integrity</div>
            </div>
          </div>

          {/* Advisory Services */}
          <div>
            <h5 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 text-[#C59B27]">
              Advisory Practices
            </h5>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_DATA.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate pr-2">{service.title}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-xs text-[#C59B27] hover:underline font-medium inline-block pt-1">
                  View All Practices &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional / Corporate Navigation */}
          <div>
            <h5 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 text-[#C59B27]">
              Corporate & Governance
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Firm Overview & Leadership
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Case Studies & Track Record
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Engineering Insights & Whitepapers
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Engagement & Governance FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Advisory Offices
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Data Governance & Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Advisory Engagement
                </Link>
              </li>
            </ul>
          </div>

          {/* Offices & Direct Coordinates */}
          <div>
            <h5 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 text-[#C59B27]">
              Principal Offices
            </h5>
            <div className="space-y-4 text-xs text-slate-300">
              <div>
                <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                  {COMPANY_PROFILE.addresses[0].location}
                </div>
                <div className="text-slate-400 pl-5">{COMPANY_PROFILE.addresses[0].street}</div>
                <div className="text-slate-400 pl-5">{COMPANY_PROFILE.addresses[0].city}</div>
                <div className="text-slate-400 pl-5 mt-0.5">{COMPANY_PROFILE.addresses[0].phone}</div>
              </div>

              <div>
                <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                  {COMPANY_PROFILE.addresses[1].location}
                </div>
                <div className="text-slate-400 pl-5">{COMPANY_PROFILE.addresses[1].street}</div>
                <div className="text-slate-400 pl-5">{COMPANY_PROFILE.addresses[1].city}</div>
                <div className="text-slate-400 pl-5 mt-0.5">{COMPANY_PROFILE.addresses[1].phone}</div>
              </div>

              <div className="pt-2 border-t border-[#16243B] space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Mail className="w-3 h-3 text-[#C59B27]" />
                  <span className="truncate">{COMPANY_PROFILE.inquiryEmail}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <span>Hours: {COMPANY_PROFILE.workingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Administrative Bar */}
      <div className="border-t border-[#14233A] bg-[#050A14] py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 {COMPANY_PROFILE.legalName}. All global rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300">
              Terms of Engagement
            </Link>
            <Link href="/admin/login" className="hover:text-[#C59B27] flex items-center gap-1 text-slate-400">
              <Lock className="w-3 h-3" />
              Administrative Gateway
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
