import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS_DATA } from "@/lib/data";
import { ArrowLeft, CheckCircle2, Shield, Calendar, BarChart3, Building } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);
  if (!project) return { title: "Case Study Not Found" };
  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-[#FAF8F5]">
      {/* Breadcrumb navigation */}
      <div className="bg-[#070D1A] py-3 text-xs text-slate-400 border-b border-[#14233A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <Link href="/projects" className="hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Case Studies</span>
          </Link>
          <span>/</span>
          <span className="text-slate-200 truncate">{project.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#0B1528] text-white py-16 border-b border-[#1E3352]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs text-[#C59B27] font-semibold uppercase tracking-wider mb-4">
              <span>{project.clientIndustry}</span>
              <span>&bull;</span>
              <span>{project.timeline}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-white leading-tight">
              {project.title}
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              {project.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-serif text-[#0B1528] mb-4">The Architectural Dilemma</h2>
              <p className="text-sm text-[#475569] leading-relaxed mb-4">
                {project.challenge}
              </p>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Operating under real-time regulatory oversight, any transitional downtime or ledger divergence would trigger immediate mandatory disclosure and compliance penalties.
              </p>
            </div>

            <div className="bg-white p-8 rounded border border-[#E2E8F0] shadow-xs">
              <h3 className="text-xl font-serif text-[#0B1528] mb-4">Advisory & Engineering Execution</h3>
              <p className="text-sm text-[#475569] leading-relaxed mb-4">
                {project.approach}
              </p>
              <div className="p-4 rounded bg-[#FAF8F5] border border-[#E2E8F0] text-xs text-[#475569] space-y-2">
                <div className="font-semibold text-[#0B1528]">Key Technical Safeguards Implemented:</div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Dual-execution verification harness comparing live telemetry streams for zero drift.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Sub-millisecond failover testing with simulated network partitions across multi-cloud regions.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Automated regulatory attestation reports integrated into ongoing CI/CD verification gates.</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded border border-[#E2E8F0] shadow-xs">
              <h3 className="text-lg font-serif text-[#0B1528] mb-3">Institutional Significance</h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Beyond immediate performance uplift, the engagement equipped internal platform teams with autonomous operational runbooks, automated chaos testing routines, and demonstrable compliance artifacts ready for annual regulatory audit cycles.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded border border-[#E2E8F0] shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B1528] pb-3 border-b border-[#E2E8F0] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#C59B27]" />
                Audited Metrics
              </h3>
              <div className="space-y-3">
                {project.outcomes.map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#FAF8F5] rounded border border-[#E2E8F0]">
                    <div className="text-lg font-bold font-mono text-[#0B1528]">{item.metric}</div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
                <Link
                  href="/appointment"
                  className="w-full py-2.5 px-4 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-xs tracking-wide text-center block transition-colors"
                >
                  Discuss Similar Architecture
                </Link>
                <Link
                  href="/projects"
                  className="w-full py-2 px-4 rounded bg-[#FAF8F5] hover:bg-[#F0ECE1] text-[#0B1528] text-xs font-medium text-center block transition-colors border border-[#CBD5E1]"
                >
                  Back to All Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
