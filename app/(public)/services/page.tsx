import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES_DATA } from "@/lib/data";
import { CheckCircle2, ArrowRight, ShieldCheck, Compass, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Advisory Practices & Systems Engineering",
  description: "Explore Vanguard Meridian's specialized technical practices: enterprise cloud topology, cyber resilience, data intelligence, and legacy modernization.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#FAF8F5]">
      {/* Header */}
      <section className="bg-[#0B1528] text-white py-16 border-b border-[#1E3352]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#C59B27] uppercase tracking-widest mb-3">
              Specialized Consulting Disciplines
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight">
              Advisory practices engineered for complex institutional environments.
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              We provide formal architecture evaluations, regulated topology formulations, and targeted remediation execution for critical production substrates.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded border border-[#E2E8F0] p-8 lg:p-10 shadow-xs hover:border-[#C59B27] transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-[#8A6D1C] uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#F0ECE1]">
                      {service.category}
                    </span>
                    <span className="text-xs text-slate-400">Typical Engagement: {service.leadTime}</span>
                  </div>

                  <h2 className="text-2xl font-serif text-[#0B1528]">
                    <Link href={`/services/${service.slug}`} className="hover:text-[#8A6D1C] transition-colors">
                      {service.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    {service.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#334155]">
                        <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#FAF8F5] p-6 rounded border border-[#E2E8F0] flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-[#0B1528] mb-3 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-[#C59B27]" />
                      Key Deliverables
                    </h4>
                    <ul className="space-y-2 text-xs text-[#64748B]">
                      {service.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-[#C59B27] font-bold">&bull;</span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E2E8F0] space-y-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="w-full py-2.5 px-4 rounded bg-[#0B1528] hover:bg-[#16243B] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Detailed Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
                    </Link>
                    <Link
                      href="/appointment"
                      className="w-full py-2 px-4 rounded bg-white hover:bg-slate-50 border border-[#CBD5E1] text-[#0B1528] text-xs font-medium text-center block transition-colors"
                    >
                      Scope This Practice
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Scoping Framework */}
      <section className="py-16 bg-[#F4F1EA] border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h3 className="text-2xl font-serif text-[#0B1528]">How we structure client engagements</h3>
            <p className="text-xs sm:text-sm text-[#475569] mt-2">
              Every practice engagement is scoped with measurable checkpoints, zero vendor lock-in, and clear bilateral governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded border border-[#E2E8F0]">
              <div className="text-xs font-bold text-[#8A6D1C] uppercase mb-1">Model A</div>
              <h4 className="text-base font-semibold text-[#0B1528] mb-2">Diagnostic & Architectural Audit</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                A bounded 4 to 8 week forensic assessment of existing systems, regulatory readiness gaps, and technical risk vectors, concluding in a board-ready report and target blueprint.
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-[#E2E8F0]">
              <div className="text-xs font-bold text-[#8A6D1C] uppercase mb-1">Model B</div>
              <h4 className="text-base font-semibold text-[#0B1528] mb-2">Embedded Architectural Advisory</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Principal architects embed with executive leadership and platform engineering squads to oversee high-risk migrations, review PRs, and enforce architectural consistency.
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-[#E2E8F0]">
              <div className="text-xs font-bold text-[#8A6D1C] uppercase mb-1">Model C</div>
              <h4 className="text-base font-semibold text-[#0B1528] mb-2">Crisis & Regulatory Remediation</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Emergency mobilization for institutions experiencing critical outages, regulatory notices, or impending audit deadlines requiring rapid technical stabilization.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
