import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Engineering Insights & Whitepapers",
  description: "Read technical perspectives and architecture treatises authored by Vanguard Meridian practice leads on distributed resilience and zero-trust engineering.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { publicationStatus: "PUBLISHED" },
    orderBy: { publishedDate: "desc" },
  });

  return (
    <div className="bg-[#FAF8F5]">
      {/* Header */}
      <section className="bg-[#0B1528] text-white py-16 border-b border-[#1E3352]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#C59B27] uppercase tracking-widest mb-3">
              Research & Technical Commentary
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight">
              Engineering Insights & Architecture Papers
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              In-depth treatises analyzing high-consequence failure modes, multi-region replication tradeoffs, and regulatory operational resilience.
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded border border-[#E2E8F0] p-7 flex flex-col justify-between hover:border-[#1E3352] transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-[#8A6D1C] uppercase tracking-wider px-2 py-0.5 rounded bg-[#F0ECE1]">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-xl font-serif text-[#0B1528] mb-3 leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#8A6D1C] transition-colors">
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-[#0B1528]">{post.authorName}</div>
                  <div className="text-[10px] text-[#64748B]">{post.authorRole}</div>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-semibold text-[#8A6D1C] hover:underline inline-flex items-center gap-1"
                >
                  <span>Read Paper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
