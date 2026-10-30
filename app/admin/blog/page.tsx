"use client";

import { useState } from "react";
import { BLOG_POSTS } from "@/lib/data";
import { BlogPostItem } from "@/types";
import { FileText, Plus, Trash2, Eye, EyeOff } from "lucide-react";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostItem[]>(BLOG_POSTS);
  const [isCreating, setIsCreating] = useState(false);

  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<BlogPostItem["category"]>("Architecture");
  const [formSummary, setFormSummary] = useState("");

  const toggleStatus = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "published" ? "draft" : "published" }
          : p
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Confirm removal of this whitepaper?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newPost: BlogPostItem = {
      id: `post-${Date.now()}`,
      slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: formTitle,
      summary: formSummary || "Technical assessment regarding critical enterprise infrastructure.",
      content: "Detailed treatise exploring architectural tradeoffs and regulatory risk models.",
      category: formCategory,
      publishedAt: new Date().toISOString().split("T")[0],
      readTime: "7 min read",
      author: {
        name: "Marcus Vance",
        role: "Chief Systems Architect"
      },
      status: "published"
    };

    setPosts([newPost, ...posts]);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3352]">
        <div>
          <h1 className="text-2xl font-serif text-white">Insights & Whitepaper Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Author and orchestrate practice research and architectural treatises.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-xs tracking-wide flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Whitepaper</span>
        </button>
      </div>

      {isCreating && (
        <div className="bg-[#0D172A] p-6 rounded border border-[#C59B27]/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E3352]">
            <h3 className="text-sm font-semibold text-white">Author Architectural Treatise</h3>
            <button onClick={() => setIsCreating(false)} className="text-xs text-slate-400 hover:text-white">
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zero-Trust Hardware Isolation Under DORA"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Research Discipline
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as BlogPostItem["category"])}
                  className="w-full px-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
                >
                  <option value="Architecture">Architecture</option>
                  <option value="Governance">Governance</option>
                  <option value="Cloud Strategy">Cloud Strategy</option>
                  <option value="Cyber Resilience">Cyber Resilience</option>
                  <option value="Applied AI">Applied AI</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Executive Abstract / Summary
              </label>
              <textarea
                rows={2}
                value={formSummary}
                onChange={(e) => setFormSummary(e.target.value)}
                placeholder="High-level technical abstract..."
                className="w-full px-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-1.5 rounded bg-slate-800 text-xs text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#C59B27] text-[#0B1528] font-bold text-xs"
              >
                Publish Article
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-[#0D172A] rounded border border-[#1E3352] overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#080E1B] text-slate-400 border-b border-[#1E3352] uppercase font-mono text-[10px]">
            <tr>
              <th className="py-3 px-4">Title & Abstract</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">State</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#16243B]">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-[#101D33] transition-colors">
                <td className="py-3.5 px-4 font-semibold text-white max-w-sm">
                  <div>{post.title}</div>
                  <div className="text-[11px] text-slate-400 font-normal line-clamp-1 mt-0.5">
                    {post.summary}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-[#C59B27] font-medium">{post.category}</td>
                <td className="py-3.5 px-4 text-slate-300">{post.author.name}</td>
                <td className="py-3.5 px-4 font-mono text-slate-400">{post.publishedAt}</td>
                <td className="py-3.5 px-4">
                  <button
                    onClick={() => toggleStatus(post.id)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                      post.status === "published"
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}
                  >
                    {post.status}
                  </button>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-1 rounded text-slate-400 hover:text-red-400"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
