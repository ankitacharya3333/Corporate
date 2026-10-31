"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Loader2, RefreshCw } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Capital Markets");
  const [formTimeline, setFormTimeline] = useState("6-Month Engagement");
  const [formSummary, setFormSummary] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const togglePublish = async (id: string, currentPublished: boolean) => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, published: !currentPublished }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, published: !currentPublished } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently remove this case study from PostgreSQL?")) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          category: formCategory,
          timeline: formTimeline,
          description: formSummary,
          published: true,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setProjects([data.project, ...projects]);
        setIsCreating(false);
        setFormName("");
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
          <h1 className="text-2xl font-serif text-white">Case Studies & Track Record</h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain institutional architectures and audited benchmark records stored in PostgreSQL.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchProjects}
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
            <span>Publish Case Study</span>
          </button>
        </div>
      </div>

      {isCreating && (
        <div className="bg-[#0D172A] p-6 rounded border border-[#C59B27]/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E3352]">
            <h3 className="text-sm font-semibold text-white">Draft Case Study</h3>
            <button onClick={() => setIsCreating(false)} className="text-xs text-slate-400 hover:text-white">
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Program / Case Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High-Volume Clearing Modernization"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Industry Classification
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Capital Markets"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Executive Outcome Summary
              </label>
              <textarea
                rows={2}
                value={formSummary}
                onChange={(e) => setFormSummary(e.target.value)}
                placeholder="Key architectural impact achieved..."
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
                Save Record in Database
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Case Studies Table */}
      <div className="bg-[#0D172A] rounded border border-[#1E3352] overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#080E1B] text-slate-400 border-b border-[#1E3352] uppercase font-mono text-[10px]">
            <tr>
              <th className="py-3 px-4">Program Title</th>
              <th className="py-3 px-4">Sector</th>
              <th className="py-3 px-4">Delivery Window</th>
              <th className="py-3 px-4">Database Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#16243B]">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#C59B27]" />
                    <span>Loading case studies from PostgreSQL...</span>
                  </div>
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">
                  No case studies currently in database.
                </td>
              </tr>
            ) : (
              projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-[#101D33] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <div>{proj.name}</div>
                    <div className="text-[11px] text-slate-400 font-normal line-clamp-1 mt-0.5">
                      {proj.description}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#C59B27]">{proj.category}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{proj.timeline}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => togglePublish(proj.id, proj.published)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono ${
                        proj.published
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {proj.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(proj.id)}
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
