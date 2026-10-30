import type { Metadata } from "next";
import Link from "next/link";
import { FAQS_DATA } from "@/lib/data";
import { HelpCircle, Shield, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions & Governance Protocols",
  description: "Learn about Vanguard Meridian's engagement models, bilateral NDA protocols, compliance standards, and advisory staffing policies.",
};

export default function FAQPage() {
  return (
    <div className="bg-[#FAF8F5]">
      {/* Header */}
      <section className="bg-[#0B1528] text-white py-16 border-b border-[#1E3352]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#C59B27] uppercase tracking-widest mb-3">
              Governance & Operations
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Clear answers regarding our engagement structures, confidentiality standards, practitioner credentials, and legal governance.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs List */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {FAQS_DATA.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-3"
            >
              <h2 className="text-base sm:text-lg font-serif text-[#0B1528] flex items-start gap-3">
                <span className="text-xs font-mono font-bold text-[#8A6D1C] px-2 py-0.5 rounded bg-[#F0ECE1] shrink-0 mt-0.5">
                  Q{index + 1}
                </span>
                <span>{faq.question}</span>
              </h2>
              <div className="text-xs sm:text-sm text-[#475569] leading-relaxed pl-9">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

        {/* Additional guidance */}
        <div className="mt-12 p-8 rounded bg-[#0B1528] text-white border border-[#1E3352] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-serif text-white mb-1">Require institutional RFP documentation?</h3>
            <p className="text-xs text-slate-300">
              Our legal and compliance team can issue mutual NDAs, capability matrices, and audit histories directly.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-xs shrink-0 transition-colors"
          >
            Contact General Counsel &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
