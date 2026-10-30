import type { Metadata } from "next";
import { COMPANY_PROFILE } from "@/lib/data";
import ContactForm from "@/components/public/ContactForm";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Advisory Offices",
  description: "Direct coordinates and confidential inquiry channels for Vanguard Meridian Partners in New York and Zurich.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#FAF8F5]">
      {/* Header */}
      <section className="bg-[#0B1528] text-white py-16 border-b border-[#1E3352]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#C59B27] uppercase tracking-widest mb-3">
              Direct Advisory Coordinates
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight">
              Initiate executive dialogue with our practice partners.
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              We respond promptly to board, executive, and regulatory inquiries across North American and European operational centers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Offices and details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-6 rounded border border-[#E2E8F0] shadow-xs space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0B1528] pb-3 border-b border-[#E2E8F0]">
                Principal Advisory Offices
              </h3>

              {COMPANY_PROFILE.addresses.map((addr, idx) => (
                <div key={idx} className="space-y-1.5 pb-4 border-b border-[#F1EDE4] last:border-0 last:pb-0">
                  <div className="text-xs font-bold text-[#0B1528] flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#C59B27]" />
                    {addr.location}
                  </div>
                  <div className="text-xs text-[#64748B] pl-5">{addr.street}</div>
                  <div className="text-xs text-[#64748B] pl-5">{addr.city}</div>
                  <div className="text-xs text-[#0B1528] font-medium pl-5 pt-1">
                    Direct Line: {addr.phone}
                  </div>
                  <div className="text-xs text-slate-500 pl-5">
                    Encrypted Gateway: {addr.email}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded border border-[#E2E8F0] space-y-4 text-xs text-[#475569]">
              <div className="font-semibold text-[#0B1528] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8A6D1C]" />
                Operating Windows
              </div>
              <div>
                <strong>Global Hours:</strong> {COMPANY_PROFILE.workingHours}
              </div>
              <p className="text-[#64748B] leading-relaxed">
                Emergency architecture war rooms and critical regulatory remediation are available 24/7 for contracted enterprise clients via direct partner escalation lines.
              </p>
            </div>

            <div className="bg-[#0B1528] text-white p-6 rounded border border-[#1E3352] space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#C59B27] font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Confidentiality Assurance
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Inquiries are treated as strictly confidential. All technical artifacts, repository links, or preliminary architectures submitted are reviewed exclusively by authorized partner personnel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
