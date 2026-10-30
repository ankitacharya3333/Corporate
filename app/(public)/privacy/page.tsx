import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Governance & Privacy Policy",
  description: "Enterprise privacy protocol, data sovereignty standards, and confidentiality terms governing Vanguard Meridian Partners.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAF8F5]">
      <section className="bg-[#0B1528] text-white py-16 border-b border-[#1E3352]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold text-[#C59B27] uppercase tracking-widest mb-2">
            Governance & Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-white">
            Data Governance & Confidentiality Policy
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Last revised: October 2026 &bull; Vanguard Meridian Advisory & Engineering Corp.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded border border-[#E2E8F0] shadow-xs text-xs sm:text-sm text-[#475569] leading-relaxed space-y-6">
          <h2 className="text-base font-serif font-bold text-[#0B1528]">1. Institutional Mandate & Scope</h2>
          <p>
            Vanguard Meridian Partners operates under strict data minimization and sovereignty protocols. We advise regulated enterprises where confidentiality, data protection, and operational isolation are legal obligations.
          </p>

          <h2 className="text-base font-serif font-bold text-[#0B1528]">2. Zero-Trust Information Boundary</h2>
          <p>
            Technical artifacts, code repositories, topology blueprints, and infrastructure logs provided during diagnostic or advisory engagements are stored in client-isolated encrypted enclaves. At no point is client proprietary data fed to public AI model providers, external analytics brokers, or unvetted third parties.
          </p>

          <h2 className="text-base font-serif font-bold text-[#0B1528]">3. Regulatory Alignment</h2>
          <p>
            Our governance practices adhere to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>European Union General Data Protection Regulation (GDPR) and Swiss FADP</li>
            <li>Digital Operational Resilience Act (DORA) Technical Standards</li>
            <li>Health Insurance Portability and Accountability Act (HIPAA) Enclave Requirements</li>
            <li>SEC Rule 17a-4 and FINRA Books & Records Guidelines</li>
          </ul>

          <h2 className="text-base font-serif font-bold text-[#0B1528]">4. Phase 1 Technical Disclosure</h2>
          <p>
            In this Phase 1 demonstration environment, all client form submissions and authentication interfaces simulate encrypted transmissions for user experience verification prior to production database and KMS wiring in Phase 2.
          </p>
        </div>
      </section>
    </div>
  );
}
