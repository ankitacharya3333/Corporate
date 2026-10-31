"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Loader2, RefreshCw } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Architecture");
  const [formSummary, setFormSummary] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch("/api/admin/blog", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, publicationStatus: newStatus }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, publicationStatus: newStatus } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently remove this whitepaper from PostgreSQL?")) return;
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          category: formCategory,
          summary: formSummary,
          content: formSummary,
          publicationStatus: "PUBLISHED",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPosts([data.post, ...posts]);
        setIsCreating(false);
        setFormTitle("");
        setFormSummary("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3352]">
        <div>
          <h1 className="text-2xl font-serif text-white">Insights & Whitepaper Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Author and orchestrate practice research and architectural treatises stored in PostgreSQL.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPosts}
            className="p-2 rounded bg-[#16243B] hover:bg-[#1E3352] text-slate-300 hover:text-white border border-[#1E3352]"
            title="Refresh database records"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-xs tracking-wide flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Whitepaper</span>
          </button>
        </div>
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
                  onChange={(e) => setFormCategory(e.target.value)}
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
                Publish Article to Database
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
              <th className="py-3 px-4">Published Date</th>
              <th className="py-3 px-4">State</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#16243B]">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#C59B27]" />
                    <span>Loading whitepapers from database...</span>
                  </div>
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No whitepapers currently in database.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#101D33] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white max-w-sm">
                    <div>{post.title}</div>
                    <div className="text-[11px] text-slate-400 font-normal line-clamp-1 mt-0.5">
                      {post.summary}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#C59B27] font-medium">{post.category}</td>
                  <td className="py-3.5 px-4 text-slate-300">{post.authorName}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{formatDate(post.publishedDate)}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleStatus(post.id, post.publicationStatus)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        post.publicationStatus === "PUBLISHED"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {post.publicationStatus}
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
