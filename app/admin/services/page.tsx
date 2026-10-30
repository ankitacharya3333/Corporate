"use client";

import { useState } from "react";
import { SERVICES_DATA } from "@/lib/data";
import { ServiceItem } from "@/types";
import { Briefcase, Plus, Edit2, Trash2, CheckCircle2, XCircle, Eye, EyeOff } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<ServiceItem["category"]>("Systems Engineering");
  const [formShort, setFormShort] = useState("");
  const [formTime, setFormTime] = useState("");

  const togglePublish = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, published: !s.published } : s))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Confirm removal of this advisory practice specification?")) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setFormTitle("");
    setFormShort("");
    setFormTime("6 to 12 weeks");
    setFormCategory("Systems Engineering");
  };

  const handleSaveCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: formTitle,
      shortDescription: formShort || "Targeted systems engineering and compliance review.",
      fullDescription: "Formal practice scoping and advisory architecture implementation.",
      category: formCategory,
      capabilities: ["Technical Audit", "Reference Architecture", "Operational Review"],
      deliverables: ["Board Whitepaper", "Capacity Matrix"],
      leadTime: formTime || "8 weeks",
      featured: false,
      published: true,
      status: "active"
    };

    setServices([newService, ...services]);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3352]">
        <div>
          <h1 className="text-2xl font-serif text-white">Advisory Practices Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Author and maintain institutional consulting disciplines, capabilities, and deliverables.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-4 py-2 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-xs tracking-wide flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Practice Area</span>
        </button>
      </div>

      {/* Creation Modal / Inline Drawer */}
      {isCreating && (
        <div className="bg-[#0D172A] p-6 rounded border border-[#C59B27]/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E3352]">
            <h3 className="text-sm font-semibold text-white">Create New Practice Discipline</h3>
            <button onClick={() => setIsCreating(false)} className="text-xs text-slate-400 hover:text-white">
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Practice Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Core Replication"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as ServiceItem["category"])}
                  className="w-full px-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
                >
                  <option value="Systems Engineering">Systems Engineering</option>
                  <option value="Strategic Advisory">Strategic Advisory</option>
                  <option value="Enterprise Security">Enterprise Security</option>
                  <option value="Data & Intelligence">Data & Intelligence</option>
                  <option value="Digital Transformation">Digital Transformation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Executive Overview Description
              </label>
              <textarea
                rows={2}
                value={formShort}
                onChange={(e) => setFormShort(e.target.value)}
                placeholder="High-level description of this advisory practice..."
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
                Save Practice
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services Table */}
      <div className="bg-[#0D172A] rounded border border-[#1E3352] overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#080E1B] text-slate-400 border-b border-[#1E3352] uppercase font-mono text-[10px]">
            <tr>
              <th className="py-3 px-4">Discipline Title</th>
              <th className="py-3 px-4">Classification</th>
              <th className="py-3 px-4">Typical Cycle</th>
              <th className="py-3 px-4">Live Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#16243B]">
            {services.map((srv) => (
              <tr key={srv.id} className="hover:bg-[#101D33] transition-colors">
                <td className="py-3.5 px-4 font-semibold text-white">
                  <div>{srv.title}</div>
                  <div className="text-[11px] text-slate-400 font-normal line-clamp-1 mt-0.5">
                    {srv.shortDescription}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-[#16243B] text-[#C59B27] font-medium text-[11px]">
                    {srv.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-400">{srv.leadTime}</td>
                <td className="py-3.5 px-4">
                  <button
                    onClick={() => togglePublish(srv.id)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono ${
                      srv.published
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}
                  >
                    {srv.published ? (
                      <>
                        <Eye className="w-3 h-3 text-emerald-400" />
                        <span>Published</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3 text-slate-400" />
                        <span>Draft</span>
                      </>
                    )}
                  </button>
                </td>
                <td className="py-3.5 px-4 text-right space-x-2">
                  <button
                    onClick={() => handleDelete(srv.id)}
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
