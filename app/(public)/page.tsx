import Link from "next/link";
import { SERVICES_DATA, PROJECTS_DATA, BLOG_POSTS, COMPANY_PROFILE } from "@/lib/data";
import {
  Shield,
  Layers,
  ArrowRight,
  Cpu,
  CheckCircle2,
  Lock,
  Workflow,
  BarChart3,
  Calendar,
  Building,
  Scale
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0B1528] text-white pt-20 pb-28 border-b border-[#1E3352] overflow-hidden">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Sector indicator badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#16243B] border border-[#C59B27]/40 text-[#C59B27] text-xs font-semibold uppercase tracking-wider mb-6">
              <Shield className="w-3.5 h-3.5" />
              Institutional Systems Architecture & Governance
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-white leading-tight">
              Engineering resilience for <span className="text-[#C59B27]">high-consequence</span> digital platforms.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              We advise corporate boards, chief technology executives, and infrastructure operators on mission-critical system modernization, sovereign cloud topologies, and zero-trust regulatory readiness.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/appointment"
                className="px-6 py-3.5 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-sm tracking-wide transition-all duration-150 text-center shadow-md flex items-center justify-center gap-2"
              >
                <span>Schedule Executive Advisory Briefing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="px-6 py-3.5 rounded bg-[#16243B] hover:bg-[#1E3352] text-slate-200 hover:text-white font-medium text-sm tracking-wide border border-[#233B5F] transition-all duration-150 text-center"
              >
                Explore Advisory Practices
              </Link>
            </div>

            {/* Regulatory & Standards alignment notes */}
            <div className="mt-12 pt-8 border-t border-[#16243B] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400">
              <div>
                <div className="text-white font-semibold">SEC & DORA</div>
                <div className="text-[11px] text-slate-400">Compliance Topologies</div>
              </div>
              <div>
                <div className="text-white font-semibold">99.999% SLA</div>
                <div className="text-[11px] text-slate-400">High-Availability Audits</div>
              </div>
              <div>
                <div className="text-white font-semibold">Zero-Trust</div>
                <div className="text-[11px] text-slate-400">Enclave Architecture</div>
              </div>
              <div>
                <div className="text-white font-semibold">Zurich & NYC</div>
                <div className="text-[11px] text-slate-400">Direct Principal Advisory</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXECUTIVE FIRM OVERVIEW */}
      <section className="py-20 bg-[#FAF8F5] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs uppercase font-bold tracking-widest text-[#8A6D1C]">
                Institutional Credibility & Mandate
              </div>
              <h2 className="text-3xl font-serif text-[#0B1528] leading-snug">
                Where technical precision meets board-level governance.
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                When core clearing pipelines, medical clinical networks, or sovereign telemetry platforms falter, the consequences are measured in regulatory censure, public trust erosion, and systemic exposure.
              </p>
              <p className="text-sm text-[#475569] leading-relaxed">
                Vanguard Meridian provides uncompromised advisory. We are neither a generalist consultancy nor a body-shop vendor; we are a dedicated collective of senior systems architects, former infrastructure directors, and regulatory compliance engineers.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1528] hover:text-[#8A6D1C] transition-colors"
                >
                  Read our full firm charter & principals &rarr;
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded border border-[#E2E8F0] shadow-sm">
                <Scale className="w-8 h-8 text-[#0B1528] mb-4" />
                <h3 className="text-base font-semibold text-[#0B1528] mb-2">Independent Architectural Rigor</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  We remain strictly vendor-agnostic. Our evaluations of multi-cloud fabrics, on-prem hardware enclaves, and distributed runtimes prioritize client sovereignty, not partner resale quotas.
                </p>
              </div>

              <div className="p-6 bg-white rounded border border-[#E2E8F0] shadow-sm">
                <Lock className="w-8 h-8 text-[#0B1528] mb-4" />
                <h3 className="text-base font-semibold text-[#0B1528] mb-2">Confidential & Air-Gapped Protocols</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  All audit work and target state blueprints are developed under strict cryptographic boundary controls. Client IP and configuration data never cross unverified perimeter lines.
                </p>
              </div>

              <div className="p-6 bg-white rounded border border-[#E2E8F0] shadow-sm">
                <Cpu className="w-8 h-8 text-[#0B1528] mb-4" />
                <h3 className="text-base font-semibold text-[#0B1528] mb-2">Deterministic Failure Engineering</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  We build for split-brain network partitions, multi-region outages, and regulatory stress scenarios using verifiable mathematical consensus models.
                </p>
              </div>

              <div className="p-6 bg-white rounded border border-[#E2E8F0] shadow-sm">
                <Building className="w-8 h-8 text-[#0B1528] mb-4" />
                <h3 className="text-base font-semibold text-[#0B1528] mb-2">Executive Alignment</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  We bridge the gap between engineering reality and audit committee expectations, articulating architectural tradeoffs into actionable risk and capital governance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE ADVISORY PRACTICES */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="text-xs uppercase font-bold tracking-widest text-[#8A6D1C]">
              Strategic Practices
            </div>
            <h2 className="text-3xl font-serif text-[#0B1528] mt-2 mb-4">
              Disciplined practices for critical infrastructure.
            </h2>
            <p className="text-sm text-[#475569]">
              Structured consulting offerings designed to identify structural bottlenecks, re-architect failure points, and instill operational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES_DATA.slice(0, 3).map((service) => (
              <div
                key={service.id}
                className="flex flex-col justify-between p-8 rounded border border-[#E2E8F0] bg-[#FAF8F5] hover:border-[#C59B27] transition-all duration-200 hover:shadow-md group"
              >
                <div>
                  <div className="text-xs font-semibold text-[#8A6D1C] uppercase tracking-wider mb-3">
                    {service.category}
                  </div>
                  <h3 className="text-xl font-serif text-[#0B1528] mb-3 group-hover:text-[#0B1528]">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#475569] leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>
                  <div className="space-y-2 border-t border-[#E2E8F0] pt-4 mb-6">
                    <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">Key Capabilities:</div>
                    {service.capabilities.slice(0, 3).map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#64748B]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Lead Time: {service.leadTime}</span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B1528] hover:text-[#8A6D1C] transition-colors"
                  >
                    <span>Practice Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#0B1528] hover:bg-[#16243B] text-white text-xs font-semibold tracking-wide transition-colors"
            >
              <span>View All 5 Specialized Advisory Practices</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. METHODOLOGY & WORKING PROCESS */}
      <section className="py-20 bg-[#F4F1EA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-xs uppercase font-bold tracking-widest text-[#8A6D1C]">
              Operational Methodology
            </div>
            <h2 className="text-3xl font-serif text-[#0B1528] mt-2 mb-4">
              A phased, deterministic engagement model.
            </h2>
            <p className="text-sm text-[#475569]">
              We minimize operational volatility through an evidence-driven engagement lifecycle with concrete milestone verification before code or topology changes occur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded border border-[#E2E8F0] shadow-xs relative">
              <div className="text-3xl font-serif font-bold text-[#C59B27]/40 mb-3">01</div>
              <h3 className="text-base font-semibold text-[#0B1528] mb-2">Enclave Diagnostic</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Comprehensive inspection of code repositories, data lineage, infrastructure-as-code manifests, and current regulatory posture under bilateral NDA.
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-[#E2E8F0] shadow-xs relative">
              <div className="text-3xl font-serif font-bold text-[#C59B27]/40 mb-3">02</div>
              <h3 className="text-base font-semibold text-[#0B1528] mb-2">Target Blueprinting</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Formulation of target architectural topologies, RTO/RPO models, threat vectors, capacity curves, and board-level risk amortization timelines.
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-[#E2E8F0] shadow-xs relative">
              <div className="text-3xl font-serif font-bold text-[#C59B27]/40 mb-3">03</div>
              <h3 className="text-base font-semibold text-[#0B1528] mb-2">Parallel Validation</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Side-by-side verification harnesses and automated chaos injection to prove zero state drift and sub-millisecond failover prior to cutover.
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-[#E2E8F0] shadow-xs relative">
              <div className="text-3xl font-serif font-bold text-[#C59B27]/40 mb-3">04</div>
              <h3 className="text-base font-semibold text-[#0B1528] mb-2">Sovereign Handover</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Deep technical knowledge transfer, golden path runbooks, and Center of Excellence establishment for autonomous ongoing internal operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED CASE STUDIES / EVIDENCE */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-[#8A6D1C]">
                Track Record & Realized Outcomes
              </div>
              <h2 className="text-3xl font-serif text-[#0B1528] mt-2 mb-2">
                Demonstrated impact across Tier 1 environments.
              </h2>
              <p className="text-sm text-[#475569] max-w-2xl">
                Representative institutional modernizations executed with verified production uptime and quantifiable architectural resilience.
              </p>
            </div>
            <Link
              href="/projects"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1528] hover:text-[#8A6D1C] transition-colors"
            >
              <span>Review all case studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PROJECTS_DATA.slice(0, 2).map((project) => (
              <div
                key={project.id}
                className="bg-[#FAF8F5] border border-[#E2E8F0] rounded p-8 flex flex-col justify-between hover:border-[#1E3352] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-[#8A6D1C] uppercase tracking-wider">{project.clientIndustry}</span>
                    <span>{project.timeline}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-[#0B1528] mb-3">{project.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded border border-[#E2E8F0] mb-6">
                    {project.outcomes.map((item, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-base sm:text-lg font-bold text-[#0B1528] font-mono">{item.metric}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#F0ECE1] text-[#0B1528]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs font-semibold text-[#0B1528] hover:text-[#8A6D1C] inline-flex items-center gap-1 shrink-0 ml-3"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LATEST ADVISORY PAPERS & WHITE PAPERS */}
      <section className="py-20 bg-[#FAF8F5] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-[#8A6D1C]">
                Engineering Insights
              </div>
              <h2 className="text-3xl font-serif text-[#0B1528] mt-2 mb-2">
                Perspectives from our senior practice leads.
              </h2>
              <p className="text-sm text-[#475569]">
                Rigorous technical analysis on distributed systems, regulatory mandates, and enclave data engineering.
              </p>
            </div>
            <Link
              href="/blog"
              className="mt-4 md:mt-0 inline-flex items-center gap-1 text-xs font-semibold text-[#0B1528] hover:text-[#8A6D1C] transition-colors"
            >
              <span>Explore all papers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded border border-[#E2E8F0] p-6 flex flex-col justify-between hover:shadow-sm transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
                    <span className="font-semibold text-[#8A6D1C] uppercase tracking-wider">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-serif text-[#0B1528] mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#8A6D1C] transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mb-6">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500">
                  <div>
                    <span className="text-[#0B1528] font-medium">{post.author.name}</span>
                    <span className="block text-[10px] text-slate-400">{post.author.role}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#8A6D1C] hover:underline font-semibold text-[11px]"
                  >
                    Read Paper &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. EXECUTIVE CONSULTATION CTA */}
      <section className="py-20 bg-[#0B1528] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16243B] text-[#C59B27] text-xs font-semibold uppercase tracking-wider mb-6 border border-[#1E3352]">
            <Calendar className="w-3.5 h-3.5" />
            Advisory Briefings & Technical Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white max-w-2xl mx-auto leading-tight">
            Initiate a confidential preliminary assessment with our principal architects.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether preparing for DORA compliance, auditing core transaction pipelines, or planning an enclave AI deployment, our partners are available for initial consultations in New York, Zurich, or via secure video conference.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/appointment"
              className="px-6 py-3.5 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-sm tracking-wide transition-colors shadow-md"
            >
              Request Executive Consultation
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded bg-[#16243B] hover:bg-[#1E3352] text-slate-200 text-sm font-medium border border-[#233B5F] transition-colors"
            >
              Direct Office Directory
            </Link>
          </div>
          <div className="mt-8 text-xs text-slate-400">
            Operating under standard mutual NDA protocols. Direct partner response within one business day.
          </div>
        </div>
      </section>
    </div>
  );
}
