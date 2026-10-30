import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES_DATA } from "@/lib/data";
import { ArrowLeft, CheckCircle2, FileText, Clock, ShieldCheck, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) return { title: "Practice Not Found" };
  return {
    title: `${service.title} | Practice Details`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-[#FAF8F5]">
      {/* Back button and practice breadcrumbs */}
      <div className="bg-[#070D1A] py-3 text-xs text-slate-400 border-b border-[#14233A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <Link href="/services" className="hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Advisory Practices</span>
          </Link>
          <span>/</span>
          <span className="text-slate-200 truncate">{service.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#0B1528] text-white py-16 border-b border-[#1E3352]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-2.5 py-1 rounded bg-[#16243B] text-[#C59B27] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#1E3352]">
              {service.category}
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-white leading-tight">
              {service.title}
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Description & Capabilities */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-serif text-[#0B1528] mb-4">Advisory Scope & Execution Blueprint</h2>
              <p className="text-sm text-[#475569] leading-relaxed mb-6">
                {service.fullDescription}
              </p>
              <p className="text-sm text-[#475569] leading-relaxed">
                Our approach emphasizes quantifiable operational resilience. Before initiating structural changes to infrastructure or data contracts, our principal architects build exhaustive failure domain simulations to verify high-consequence requirements.
              </p>
            </div>

            <div className="bg-white p-8 rounded border border-[#E2E8F0] shadow-xs">
              <h3 className="text-lg font-serif text-[#0B1528] mb-4">Technical Capabilities & Verification</h3>
              <div className="space-y-3">
                {service.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded bg-[#FAF8F5] border border-[#E2E8F0]">
                    <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-[#0B1528]">{cap}</div>
                      <div className="text-[11px] text-[#64748B] mt-0.5">
                        Delivered with automated testing manifests, runnable benchmarks, and regulatory traceability matrices.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded border border-[#E2E8F0] shadow-xs">
              <h3 className="text-lg font-serif text-[#0B1528] mb-3">Audit Committee & Board Deliverables</h3>
              <p className="text-xs text-[#64748B] mb-4">
                At the conclusion of each advisory phase, executive leadership receives formal artifacts that withstand external scrutiny:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="p-3 rounded border border-[#E2E8F0] bg-slate-50 flex items-start gap-2">
                    <FileText className="w-4 h-4 text-[#0B1528] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#334155] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded border border-[#E2E8F0] shadow-xs space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0B1528] pb-3 border-b border-[#E2E8F0]">
                Engagement Logistics
              </h3>

              <div className="flex items-center gap-3 text-xs text-[#475569]">
                <Clock className="w-4 h-4 text-[#8A6D1C]" />
                <div>
                  <div className="font-semibold text-[#0B1528]">Typical Timeframe</div>
                  <div>{service.leadTime}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#475569]">
                <ShieldCheck className="w-4 h-4 text-[#8A6D1C]" />
                <div>
                  <div className="font-semibold text-[#0B1528]">Governance Standard</div>
                  <div>Bilateral NDA & SOC2 Type II Enclave</div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                <Link
                  href="/appointment"
                  className="w-full py-2.5 px-4 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-xs tracking-wide text-center block transition-colors"
                >
                  Schedule Practice Briefing
                </Link>
                <Link
                  href="/contact"
                  className="w-full py-2.5 px-4 rounded bg-[#0B1528] hover:bg-[#16243B] text-white text-xs font-semibold text-center block transition-colors"
                >
                  Contact Practice Lead
                </Link>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded border border-[#E2E8F0]">
              <h4 className="text-xs font-bold text-[#0B1528] uppercase mb-2">Related Practice</h4>
              <p className="text-xs text-[#64748B] mb-3">
                Need end-to-end modernization combined with security governance? Our cross-functional teams frequently pair architecture audits with zero-trust posture reviews.
              </p>
              <Link
                href="/services"
                className="text-xs font-semibold text-[#8A6D1C] hover:underline flex items-center gap-1"
              >
                <span>Browse all practices</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
