import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Advisory Engagement",
  description: "Standard terms and legal provisions governing professional systems architecture and consulting services.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAF8F5]">
      <section className="bg-[#0B1528] text-white py-16 border-b border-[#1E3352]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold text-[#C59B27] uppercase tracking-widest mb-2">
            Legal Framework
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-white">
            Terms of Advisory Engagement
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Effective October 2026 &bull; Vanguard Meridian Partners
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded border border-[#E2E8F0] shadow-xs text-xs sm:text-sm text-[#475569] leading-relaxed space-y-6">
          <h2 className="text-base font-serif font-bold text-[#0B1528]">1. Nature of Advisory Services</h2>
          <p>
            Vanguard Meridian Partners provides high-consequence technology advisory, distributed systems engineering, and cyber governance consulting. All advisory recommendations, architectural blueprints, and stress testing models are provided on an engineering consulting basis subject to individual Statements of Work (SOW).
          </p>

          <h2 className="text-base font-serif font-bold text-[#0B1528]">2. Bilateral Confidentiality & Intellectual Property</h2>
          <p>
            Unless explicitly agreed otherwise in a signed SOW, all pre-existing client intellectual property remains solely with the client. Custom architectural blueprints and infrastructure-as-code manifests authored expressly for the client transfer to the client upon full payment.
          </p>

          <h2 className="text-base font-serif font-bold text-[#0B1528]">3. Vendor Independence</h2>
          <p>
            Vanguard Meridian strictly maintains independence from cloud infrastructure providers, hardware manufacturers, and software vendors. Any technical recommendation is grounded exclusively in engineering feasibility, cost optimization, and risk mitigation.
          </p>

          <h2 className="text-base font-serif font-bold text-[#0B1528]">4. Governing Jurisdiction</h2>
          <p>
            Advisory engagements are governed under the laws of the State of New York or the Canton of Zurich, as specified in the executed bilateral agreement.
          </p>
        </div>
      </section>
    </div>
  );
}

