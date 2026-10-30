"use client";

import { useState } from "react";
import { PROJECTS_DATA } from "@/lib/data";
import { ProjectItem } from "@/types";
import { Layers, Plus, Trash2, Eye, EyeOff } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS_DATA);
  const [isCreating, setIsCreating] = useState(false);

  const [formTitle, setFormTitle] = useState("");
  const [formIndustry, setFormIndustry] = useState("");
  const [formTimeline, setFormTimeline] = useState("");
  const [formSummary, setFormSummary] = useState("");

  const togglePublish = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Confirm removal of this case study entry?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: formTitle,
      clientIndustry: formIndustry || "Institutional Finance",
      timeline: formTimeline || "6-Month Engagement",
      summary: formSummary || "Institutional infrastructure modernization and topology review.",
      challenge: "Legacy architectural bottlenecks threatened operational continuity.",
      approach: "Engineered decoupled event streaming with continuous compliance gates.",
      outcomes: [{ metric: "100%", label: "Target Verification Passed" }],
      tags: ["Systems Architecture", "Enterprise Security"],
      featured: false,
      published: true,
    };

    setProjects([newProj, ...projects]);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3352]">
        <div>
          <h1 className="text-2xl font-serif text-white">Case Studies & Track Record</h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain documented institutional architectures and audited benchmarks.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-xs tracking-wide flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Case Study</span>
        </button>
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
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
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
                  value={formIndustry}
                  onChange={(e) => setFormIndustry(e.target.value)}
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
                Save Record
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
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#16243B]">
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-[#101D33] transition-colors">
                <td className="py-3.5 px-4 font-semibold text-white">
                  <div>{proj.title}</div>
                  <div className="text-[11px] text-slate-400 font-normal line-clamp-1 mt-0.5">
                    {proj.summary}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-[#C59B27]">{proj.clientIndustry}</td>
                <td className="py-3.5 px-4 font-mono text-slate-400">{proj.timeline}</td>
                <td className="py-3.5 px-4">
                  <button
                    onClick={() => togglePublish(proj.id)}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
