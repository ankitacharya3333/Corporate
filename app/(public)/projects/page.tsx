import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArrowRight, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies & Architectural Track Record",
  description: "Review documented enterprise architectures, distributed core modernizations, and regulated systems outcomes delivered by Vanguard Meridian Partners.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="bg-[#FAF8F5]">
      {/* Header */}
      <section className="bg-[#0B1528] text-white py-16 border-b border-[#1E3352]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#C59B27] uppercase tracking-widest mb-3">
              Verifiable Case Studies & Outcomes
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight">
              Production architectures operating under regulatory scrutiny.
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Explore concrete engineering interventions where our teams designed, validated, and transitioned critical substrates with zero business interruption.
            </p>
          </div>
        </div>
      </section>

      {/* Case studies list */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {projects.map((project) => {
            let outcomes: { metric: string; label: string }[] = [];
            try {
              if (project.outcomesJson) {
                outcomes = JSON.parse(project.outcomesJson);
              }
            } catch {
              outcomes = [];
            }

            return (
              <div
                key={project.id}
                className="bg-white rounded border border-[#E2E8F0] p-8 lg:p-10 shadow-xs hover:border-[#1E3352] transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0] mb-8">
                  <div>
                    <div className="text-xs font-bold text-[#8A6D1C] uppercase tracking-wider mb-1">
                      {project.category}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif text-[#0B1528]">
                      <Link href={`/projects/${project.slug}`} className="hover:text-[#8A6D1C] transition-colors">
                        {project.name}
                      </Link>
                    </h2>
                  </div>
                  <div className="text-xs text-slate-500 font-mono bg-[#FAF8F5] px-3 py-1.5 rounded border border-[#E2E8F0] self-start lg:self-auto">
                    {project.timeline}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    {project.challenge && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">The Institutional Challenge</h3>
                        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>
                    )}

                    {project.approach && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Our Engineering Approach</h3>
                        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                          {project.approach}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((t, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-0.5 rounded bg-[#F0ECE1] text-[#0B1528] font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#FAF8F5] p-6 rounded border border-[#E2E8F0] flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#0B1528] mb-4 flex items-center gap-1.5">
                        <BarChart3 className="w-4 h-4 text-[#C59B27]" />
                        Realized Benchmarks
                      </div>
                      <div className="space-y-4">
                        {outcomes.map((out, idx) => (
                          <div key={idx} className="bg-white p-3.5 rounded border border-[#E2E8F0]">
                            <div className="text-xl font-bold font-mono text-[#0B1528]">{out.metric}</div>
                            <div className="text-xs text-[#64748B] mt-0.5">{out.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="w-full py-2.5 px-4 rounded bg-[#0B1528] hover:bg-[#16243B] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>Read Complete Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
