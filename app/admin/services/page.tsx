"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Eye, EyeOff, Loader2, RefreshCw } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Systems Engineering");
  const [formShort, setFormShort] = useState("");
  const [formTime, setFormTime] = useState("6 to 12 weeks");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data.services || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const togglePublish = async (id: string, currentPublished: boolean) => {
    try {
      const res = await fetch("/api/admin/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, published: !currentPublished }),
      });
      if (res.ok) {
        setServices((prev) =>
          prev.map((s) => (s.id === id ? { ...s, published: !currentPublished } : s))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently remove this advisory practice from PostgreSQL?")) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          category: formCategory,
          shortDescription: formShort,
          description: formShort,
          leadTime: formTime,
          published: true,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setServices([data.service, ...services]);
        setIsCreating(false);
        setFormName("");
        setFormShort("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3352]">
        <div>
          <h1 className="text-2xl font-serif text-white">Advisory Practices Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Database-driven management for consulting disciplines, capabilities, and deliverables.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchServices}
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
            <span>Add Practice Area</span>
          </button>
        </div>
      </div>

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
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
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
                Save Practice in Database
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
              <th className="py-3 px-4">Database State</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#16243B]">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#C59B27]" />
                    <span>Loading practices from PostgreSQL...</span>
                  </div>
                </td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">
                  No practices currently in database.
                </td>
              </tr>
            ) : (
              services.map((srv) => (
                <tr key={srv.id} className="hover:bg-[#101D33] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <div>{srv.name}</div>
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
                      onClick={() => togglePublish(srv.id, srv.published)}
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
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(srv.id)}
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
