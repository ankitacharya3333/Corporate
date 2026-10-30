import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Paper Not Found" };
  return {
    title: `${post.title} | Technical Treatise`,
    description: post.summary,
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-[#FAF8F5]">
      {/* Breadcrumbs */}
      <div className="bg-[#070D1A] py-3 text-xs text-slate-400 border-b border-[#14233A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <Link href="/blog" className="hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Insights</span>
          </Link>
          <span>/</span>
          <span className="text-slate-200 truncate">{post.title}</span>
        </div>
      </div>

      {/* Article Header */}
      <section className="bg-[#0B1528] text-white py-16 border-b border-[#1E3352]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-2.5 py-1 rounded bg-[#16243B] text-[#C59B27] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#1E3352]">
            {post.category} &bull; Practice Research
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-white leading-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-6 border-t border-[#1E3352]">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>{post.author.name} &bull; {post.author.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Published: {post.publishedAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white p-8 sm:p-12 rounded border border-[#E2E8F0] shadow-xs space-y-6">
          <div className="text-base font-medium text-[#0B1528] leading-relaxed border-b border-[#E2E8F0] pb-6 italic">
            &ldquo;{post.summary}&rdquo;
          </div>

          <div className="text-xs sm:text-sm text-[#334155] leading-relaxed space-y-4">
            <p>{post.content}</p>
            <h3 className="text-base font-serif font-bold text-[#0B1528] pt-4">1. Architectural Assumptions Under Stress</h3>
            <p>
              In conventional systems engineering, teams often build around mean-time-between-failures (MTBF). However, in high-consequence enterprise architectures, we advise shifting metrics toward deterministic recovery time objective (RTO) verification under active partition splits.
            </p>
            <p>
              When synchronous replication is placed across geographic regions with ping times exceeding 30 milliseconds, locking semantics drastically degrade write throughput. Conversely, naive asynchronous replication introduces split-brain reconciliation nightmares when connectivity drops.
            </p>
            <h3 className="text-base font-serif font-bold text-[#0B1528] pt-4">2. Verifiable Boundary Enforcement</h3>
            <p>
              Regulatory compliance frameworks such as DORA or SEC Rule 17a-4 require demonstrable operational continuity. Compliance cannot remain an annual spreadsheet audit; it must be backed by continuous automated resilience testing embedded in internal platform pipelines.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs text-[#64748B]">
              Authored by the Vanguard Meridian Technical Practice Advisory Board.
            </div>
            <Link
              href="/appointment"
              className="text-xs font-semibold px-4 py-2 rounded bg-[#0B1528] text-white hover:bg-[#16243B] transition-colors"
            >
              Discuss with Practice Lead &rarr;
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
