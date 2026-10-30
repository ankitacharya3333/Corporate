import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY_PROFILE } from "@/lib/data";
import { ShieldCheck, Target, Award, Users, MapPin, CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Our Firm & Principals",
  description: "Learn about Vanguard Meridian Partners, our institutional systems engineering charter, leadership, and independence standards.",
};

export default function AboutPage() {
  const leadership = [
    {
      name: "Marcus Vance",
      title: "Managing Principal & Chief Systems Architect",
      bio: "Former Head of Infrastructure for Global Markets at a Tier 1 investment bank. 22 years designing fault-tolerant low latency trading systems and distributed clearing protocols.",
      focus: "Event-Driven Topologies, Multi-Region Consensus, DORA Resilience"
    },
    {
      name: "Elena Rostova",
      title: "Managing Director, Regulatory Engineering & Governance",
      bio: "Previously Senior Compliance Director with European market authorities and advisory fellow at Cambridge Cyber Institute. Specializes in financial infrastructure stress-testing.",
      focus: "SEC Rule 17a-4, DORA Mandates, Sovereign Data Enclaves"
    },
    {
      name: "David Chen, Ph.D.",
      title: "Principal, Applied Intelligence & Data Sovereignty",
      bio: "Doctorate in Distributed Systems from ETH Zurich. Led research into confidential computing and federated learning architectures across international healthcare consortia.",
      focus: "Private LLM Infrastructure, High-Throughput Streaming, Cryptographic Enclaves"
    },
    {
      name: "Sarah Hawthorne",
      title: "Partner, Modernization Strategy & Execution",
      bio: "Over 18 years steering complex legacy core migrations for global retail banks, sovereign wealth funds, and critical transport networks.",
      focus: "Strangler Fig Methodologies, Zero-Downtime Data Migration, TCO Auditing"
    }
  ];

  return (
    <div className="bg-[#FAF8F5]">
      {/* Header section */}
      <section className="bg-[#0B1528] text-white py-16 border-b border-[#1E3352]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#C59B27] uppercase tracking-widest mb-3">
              Institutional Heritage & Mandate
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight">
              Independent engineering integrity for mission-critical enterprise platforms.
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Founded in 2014, Vanguard Meridian exists to provide uncompromised, vendor-agnostic architecture counsel to organizations whose operations cannot tolerate systemic failure.
            </p>
          </div>
        </div>
      </section>

      {/* Core Charter & Principles */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded border border-[#E2E8F0] shadow-sm">
            <ShieldCheck className="w-8 h-8 text-[#0B1528] mb-4" />
            <h3 className="text-lg font-serif text-[#0B1528] mb-2">Uncompromising Vendor Neutrality</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              We accept no reseller kickbacks, cloud-partner commissions, or hardware vendor subsidies. When we recommend a topology or technology choice, it is driven solely by mathematical fit, durability, and cost-effectiveness for the client.
            </p>
          </div>

          <div className="bg-white p-8 rounded border border-[#E2E8F0] shadow-sm">
            <Target className="w-8 h-8 text-[#0B1528] mb-4" />
            <h3 className="text-lg font-serif text-[#0B1528] mb-2">Practitioner-Led Advisory</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              We do not employ junior analysts or assign generalists to high-consequence projects. Every engagement is staffed directly by veteran practitioners with decades of hands-on production engineering experience in regulated domains.
            </p>
          </div>

          <div className="bg-white p-8 rounded border border-[#E2E8F0] shadow-sm">
            <Award className="w-8 h-8 text-[#0B1528] mb-4" />
            <h3 className="text-lg font-serif text-[#0B1528] mb-2">Verifiable Stress Verification</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              We do not produce theoretical slide presentations that gather dust. Our architectural recommendations are accompanied by runnable benchmark harnesses, stress-testing scripts, and mathematical proofs of operational continuity.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative & History */}
      <section className="py-16 bg-[#F4F1EA] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#8A6D1C]">
                Our Firm Evolution
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#0B1528]">
                Formed in response to mounting technological fragility.
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                As enterprise systems grew increasingly interdependent on third-party cloud APIs and distributed microservices, many corporate boards discovered that technical debt and architectural sprawl had degraded their visibility into catastrophic failure modes.
              </p>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Vanguard Meridian was established in Zurich and New York to provide deep forensic evaluation and resilient replatforming. Over the past decade, we have stabilized clearing architectures handling trillions of dollars, structured confidential health data federations, and hardened industrial telemetry fabrics against regional blackouts.
              </p>
              <div className="pt-2 flex items-center gap-6 text-xs text-[#0B1528] font-medium">
                <div>&bull; 10+ Years Operational Advisory</div>
                <div>&bull; $100B+ Cumulative Asset Enclaves Audited</div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-8 rounded border border-[#E2E8F0] shadow-sm space-y-5">
              <h3 className="text-base font-semibold text-[#0B1528] pb-3 border-b border-[#E2E8F0]">
                Institutional Standards We Hold
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#475569]">
                    <strong className="text-[#0B1528]">Zero-Trust Enclave Isolation:</strong> All client documentation, network logs, and source audits remain encrypted inside sovereign hardware boundaries.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#475569]">
                    <strong className="text-[#0B1528]">Deterministic RTO/RPO Metrics:</strong> We design recovery architectures with mathematically proven recovery time and zero allowable data loss.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#475569]">
                    <strong className="text-[#0B1528]">Center of Excellence Enablement:</strong> We ensure your staff gains full sovereign ownership of target architectures through paired runbooks and structured knowledge handoffs.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase font-bold tracking-widest text-[#8A6D1C]">
            Practice Leadership
          </div>
          <h2 className="text-3xl font-serif text-[#0B1528] mt-2 mb-3">
            Principal Architects & Managing Directors
          </h2>
          <p className="text-xs sm:text-sm text-[#475569]">
            Our leadership actively directs client engagements, authors target state blueprints, and personally testifies before audit committees and oversight boards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leadership.map((person, idx) => (
            <div key={idx} className="bg-white p-7 rounded border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-serif text-[#0B1528]">{person.name}</h3>
                  <span className="text-[11px] font-mono text-[#8A6D1C] px-2 py-0.5 rounded bg-[#F0ECE1]">Practice Partner</span>
                </div>
                <div className="text-xs font-semibold text-[#64748B] mb-3">{person.title}</div>
                <p className="text-xs text-[#475569] leading-relaxed mb-4">{person.bio}</p>
              </div>
              <div className="pt-3 border-t border-[#E2E8F0] text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Advisory Focus: </span>
                {person.focus}
              </div>
            </div>
          ))}
        </div>

        {/* Global Locations */}
        <div className="mt-16 bg-[#0B1528] text-white p-8 rounded-lg border border-[#1E3352] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-xs font-semibold text-[#C59B27] uppercase tracking-wider mb-2">Global Operations</div>
            <h3 className="text-2xl font-serif text-white mb-3">Dual-Continental Presence</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Operating out of permanent facilities in Manhattan and Zurich Paradeplatz, our teams provide continuous coverage across North American and European regulatory markets.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/appointment"
              className="px-5 py-3 rounded bg-[#C59B27] text-[#0B1528] font-bold text-xs tracking-wide hover:bg-[#B38A1F] text-center"
            >
              Schedule Executive Discussion
            </Link>
            <Link
              href="/contact"
              className="px-5 py-3 rounded bg-[#16243B] text-slate-200 text-xs font-medium border border-[#233B5F] hover:text-white text-center"
            >
              Contact Advisory Offices
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
