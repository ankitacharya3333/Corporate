"use client";

import { useEffect, useState } from "react";
import { Search, Loader2, RefreshCw } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/users", window.location.origin);
      if (searchTerm) url.searchParams.set("search", searchTerm);
      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3352]">
        <div>
          <h1 className="text-2xl font-serif text-white">Client Accounts & Enterprise Users</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time directory of corporate accounts registered in PostgreSQL. Passwords and hashes are strictly protected.
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="p-2 rounded bg-[#16243B] hover:bg-[#1E3352] text-slate-300 hover:text-white border border-[#1E3352]"
          title="Refresh database records"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-[#0D172A] p-4 rounded border border-[#1E3352]">
        <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search enterprise user or company... (Enter)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
          />
        </form>
        <div className="text-xs text-slate-400">
          Showing {users.length} registered accounts
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0D172A] rounded border border-[#1E3352] overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#080E1B] text-slate-400 border-b border-[#1E3352] uppercase font-mono text-[10px]">
            <tr>
              <th className="py-3 px-4">Authorized User</th>
              <th className="py-3 px-4">Organization & Contact</th>
              <th className="py-3 px-4">System Role</th>
              <th className="py-3 px-4">Created Date</th>
              <th className="py-3 px-4">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#16243B]">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#C59B27]" />
                    <span>Loading users from database...</span>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">
                  No registered users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-[#101D33] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{user.name}</div>
                    <div className="text-[11px] text-slate-400">{user.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-white font-medium">{user.company || "Individual Organization"}</div>
                    <div className="text-[11px] text-slate-400">{user.phone || "No direct phone"}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    <span className={`px-2 py-0.5 rounded border ${
                      user.role === "ADMIN"
                        ? "bg-[#C59B27]/20 text-[#C59B27] border-[#C59B27]/40 font-bold"
                        : "bg-[#16243B] text-slate-300 border-[#1E3352]"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                      user.accountStatus === "ACTIVE"
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        : "bg-blue-950 text-blue-300 border border-blue-800"
                    }`}>
                      {user.accountStatus}
                    </span>
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
