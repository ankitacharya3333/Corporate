"use client";

import { useState } from "react";
import { MOCK_CUSTOMERS } from "@/lib/data";
import { CustomerUser } from "@/types";
import { Users, UserCheck, Shield, Search, MoreHorizontal, UserPlus } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<CustomerUser[]>(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3352]">
        <div>
          <h1 className="text-2xl font-serif text-white">Client Accounts & Enterprise Users</h1>
          <p className="text-xs text-slate-400 mt-1">
            Directory of corporate stakeholders authorized to view confidential blueprints.
          </p>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-[#0D172A] p-4 rounded border border-[#1E3352]">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search enterprise user or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
          />
        </div>
        <div className="text-xs text-slate-400">
          Showing {filtered.length} verified accounts
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0D172A] rounded border border-[#1E3352] overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#080E1B] text-slate-400 border-b border-[#1E3352] uppercase font-mono text-[10px]">
            <tr>
              <th className="py-3 px-4">Authorized User</th>
              <th className="py-3 px-4">Organization & Title</th>
              <th className="py-3 px-4">Enclave Tier</th>
              <th className="py-3 px-4">Onboarded</th>
              <th className="py-3 px-4">State</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#16243B]">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-[#101D33] transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-white">{user.name}</div>
                  <div className="text-[11px] text-slate-400">{user.email}</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="text-white font-medium">{user.company}</div>
                  <div className="text-[11px] text-slate-400">{user.role}</div>
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-[#16243B] text-[#C59B27] border border-[#1E3352]">
                    {user.tier}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-400">
                  {user.joinedDate}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                    user.status === "active"
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      : "bg-blue-950 text-blue-300 border border-blue-800"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button className="px-2.5 py-1 rounded bg-[#16243B] hover:bg-[#1E3352] text-xs text-slate-300 hover:text-white">
                    Inspect Access
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

