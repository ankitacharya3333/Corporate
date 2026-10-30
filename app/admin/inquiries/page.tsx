"use client";

import { useState } from "react";
import { MOCK_INQUIRIES } from "@/lib/data";
import { InquiryItem } from "@/types";
import { formatDate } from "@/lib/utils";
import { Search, Filter, Eye, Check, X, Shield, ArrowUpDown } from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>(MOCK_INQUIRIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: InquiryItem["status"]) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3352]">
        <div>
          <h1 className="text-2xl font-serif text-white">Institutional Inquiries</h1>
          <p className="text-xs text-slate-400 mt-1">
            Forensic review and status orchestration for direct client submissions.
          </p>
        </div>
        <div className="text-xs font-mono text-[#C59B27] px-3 py-1.5 rounded bg-[#16243B] border border-[#1E3352] self-start sm:self-auto">
          Active Records: {filtered.length} of {inquiries.length}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-[#0D172A] p-4 rounded border border-[#1E3352]">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search ticket, name, organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
          >
            <option value="all">All Inquiries</option>
            <option value="new">New (Unreviewed)</option>
            <option value="in_review">In Review</option>
            <option value="contacted">Contacted</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Table Interface */}
      <div className="bg-[#0D172A] rounded border border-[#1E3352] overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#080E1B] text-slate-400 border-b border-[#1E3352] uppercase font-mono text-[10px]">
            <tr>
              <th className="py-3 px-4">Ticket</th>
              <th className="py-3 px-4">Entity & Sender</th>
              <th className="py-3 px-4">Practice Domain</th>
              <th className="py-3 px-4">Submitted</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#16243B]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No institutional inquiries matching current filters.
                </td>
              </tr>
            ) : (
              filtered.map((inq) => (
                <tr key={inq.id} className="hover:bg-[#101D33] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-[#C59B27]">
                    {inq.ticketNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{inq.organization}</div>
                    <div className="text-[11px] text-slate-400">{inq.name} &bull; {inq.email}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate">
                    {inq.serviceInterest}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {formatDate(inq.submittedAt)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                      inq.status === "new"
                        ? "bg-amber-950/80 text-amber-300 border border-amber-800"
                        : inq.status === "in_review"
                        ? "bg-blue-950/80 text-blue-300 border border-blue-800"
                        : inq.status === "contacted"
                        ? "bg-indigo-950/80 text-indigo-300 border border-indigo-800"
                        : "bg-emerald-950/80 text-emerald-300 border border-emerald-800"
                    }`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedInquiry(inq)}
                      className="px-3 py-1 rounded bg-[#16243B] hover:bg-[#1E3352] text-slate-200 hover:text-white text-xs border border-[#1E3352] inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C59B27]" />
                      <span>Review</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Slide-Over / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D172A] border border-[#1E3352] rounded max-w-xl w-full p-6 text-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E3352]">
              <div>
                <span className="text-[11px] font-mono text-[#C59B27]">{selectedInquiry.ticketNumber}</span>
                <h3 className="text-lg font-serif text-white">{selectedInquiry.subject}</h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-[#080E1B] p-3 rounded border border-[#16243B]">
              <div>
                <span className="text-slate-400 block text-[10px]">Client / Organization:</span>
                <span className="text-white font-medium">{selectedInquiry.organization}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Contact Person:</span>
                <span className="text-white">{selectedInquiry.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Email Coordinates:</span>
                <span className="text-[#C59B27]">{selectedInquiry.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Phone Line:</span>
                <span className="text-slate-300">{selectedInquiry.phone || "Not provided"}</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono mb-1">Inquiry Scope / Message:</div>
              <div className="text-xs text-slate-300 bg-[#080E1B] p-4 rounded border border-[#16243B] leading-relaxed">
                {selectedInquiry.message}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Set Status:</span>
                <div className="flex gap-1.5">
                  {(["new", "in_review", "contacted", "resolved"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                      className={`text-[10px] font-mono uppercase px-2 py-1 rounded transition-colors ${
                        selectedInquiry.status === st
                          ? "bg-[#C59B27] text-[#0B1528] font-bold"
                          : "bg-[#16243B] text-slate-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-white"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
