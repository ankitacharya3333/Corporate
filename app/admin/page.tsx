"use client";

import Link from "next/link";
import {
  MOCK_INQUIRIES,
  MOCK_APPOINTMENTS,
  MOCK_CUSTOMERS,
  SERVICES_DATA,
  PROJECTS_DATA
} from "@/lib/data";
import {
  Users,
  MessageSquare,
  CalendarCheck,
  Clock,
  Briefcase,
  Layers,
  ArrowUpRight,
  Shield,
  Activity,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function AdminDashboardPage() {
  const pendingAppointments = MOCK_APPOINTMENTS.filter((a) => a.status === "pending").length;
  const newInquiries = MOCK_INQUIRIES.filter((i) => i.status === "new").length;

  return (
    <div className="space-y-8">
      {/* Top Banner / System State */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E3352]">
        <div>
          <div className="text-xs font-mono text-[#C59B27] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            Administrative Operations Center
          </div>
          <h1 className="text-2xl font-serif text-white">System Executive Overview</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time management interface for practice pipelines, enterprise accounts, and scheduled advisory briefings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/inquiries"
            className="px-3.5 py-2 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-xs tracking-wide transition-colors"
          >
            Review New Inquiries ({newInquiries})
          </Link>
          <Link
            href="/admin/appointments"
            className="px-3.5 py-2 rounded bg-[#16243B] hover:bg-[#1E3352] text-white text-xs border border-[#1E3352] transition-colors"
          >
            Manage Bookings
          </Link>
        </div>
      </div>

      {/* Phase 1 Data Transparency Notice */}
      <div className="p-3 rounded bg-[#101D33] border border-[#233B5F] text-xs text-slate-300 flex items-start gap-3">
        <Shield className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">[Phase 1 Demonstration Substrate]:</strong> The metrics, client records, and appointment schedules shown below represent pre-seeded structural verification models. Phase 2 will bind these directly to Postgres/Supabase tables with audit-logging triggers.
        </div>
      </div>

      {/* Primary KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-[#0D172A] p-4 rounded border border-[#1E3352]">
          <div className="text-slate-400 text-[11px] font-medium flex items-center justify-between">
            <span>Inquiries</span>
            <MessageSquare className="w-3.5 h-3.5 text-[#C59B27]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{MOCK_INQUIRIES.length}</div>
          <div className="text-[10px] text-[#C59B27] mt-1">{newInquiries} unreviewed</div>
        </div>

        <div className="bg-[#0D172A] p-4 rounded border border-[#1E3352]">
          <div className="text-slate-400 text-[11px] font-medium flex items-center justify-between">
            <span>Appointments</span>
            <CalendarCheck className="w-3.5 h-3.5 text-[#C59B27]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{MOCK_APPOINTMENTS.length}</div>
          <div className="text-[10px] text-amber-400 mt-1">{pendingAppointments} pending review</div>
        </div>

        <div className="bg-[#0D172A] p-4 rounded border border-[#1E3352]">
          <div className="text-slate-400 text-[11px] font-medium flex items-center justify-between">
            <span>Enterprise Users</span>
            <Users className="w-3.5 h-3.5 text-[#C59B27]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{MOCK_CUSTOMERS.length}</div>
          <div className="text-[10px] text-emerald-400 mt-1">100% verified domains</div>
        </div>

        <div className="bg-[#0D172A] p-4 rounded border border-[#1E3352]">
          <div className="text-slate-400 text-[11px] font-medium flex items-center justify-between">
            <span>Practices</span>
            <Briefcase className="w-3.5 h-3.5 text-[#C59B27]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{SERVICES_DATA.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">All active & published</div>
        </div>

        <div className="bg-[#0D172A] p-4 rounded border border-[#1E3352]">
          <div className="text-slate-400 text-[11px] font-medium flex items-center justify-between">
            <span>Case Studies</span>
            <Layers className="w-3.5 h-3.5 text-[#C59B27]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{PROJECTS_DATA.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">Tier 1 verified</div>
        </div>

        <div className="bg-[#0D172A] p-4 rounded border border-[#1E3352]">
          <div className="text-slate-400 text-[11px] font-medium flex items-center justify-between">
            <span>System Integrity</span>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-2">100%</div>
          <div className="text-[10px] text-slate-400 mt-1">Zero known CVEs</div>
        </div>
      </div>

      {/* Two-Column Operation Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Inquiries */}
        <div className="lg:col-span-7 bg-[#0D172A] rounded border border-[#1E3352] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E3352]">
            <div>
              <h2 className="text-sm font-semibold text-white">Recent Institutional Inquiries</h2>
              <p className="text-[11px] text-slate-400">Incoming partner consultations awaiting assignment</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs text-[#C59B27] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Full Inbox</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_INQUIRIES.map((inq) => (
              <div
                key={inq.id}
                className="p-3.5 rounded bg-[#080E1B] border border-[#1E3352] hover:border-[#C59B27] transition-colors"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-white">{inq.organization}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                    inq.status === "new"
                      ? "bg-amber-950/80 text-amber-300 border border-amber-800"
                      : inq.status === "in_review"
                      ? "bg-blue-950/80 text-blue-300 border border-blue-800"
                      : "bg-emerald-950/80 text-emerald-300 border border-emerald-800"
                  }`}>
                    {inq.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-medium">{inq.subject}</div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{inq.message}</div>
                <div className="mt-2 pt-2 border-t border-[#16243B] flex items-center justify-between text-[10px] text-slate-400">
                  <span>Contact: {inq.name} ({inq.email})</span>
                  <span>Ticket: {inq.ticketNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Scheduled Briefings */}
        <div className="lg:col-span-5 bg-[#0D172A] rounded border border-[#1E3352] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E3352]">
            <div>
              <h2 className="text-sm font-semibold text-white">Upcoming Consultation Slots</h2>
              <p className="text-[11px] text-slate-400">Executive calendar appointments</p>
            </div>
            <Link
              href="/admin/appointments"
              className="text-xs text-[#C59B27] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Manage</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_APPOINTMENTS.map((apt) => (
              <div
                key={apt.id}
                className="p-3.5 rounded bg-[#080E1B] border border-[#1E3352]"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-white">{apt.clientName}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    apt.status === "confirmed"
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      : "bg-amber-950 text-amber-300 border border-amber-800"
                  }`}>
                    {apt.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400">{apt.organization}</div>
                <div className="mt-2 text-xs text-[#C59B27] flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{apt.preferredDate} &bull; {apt.preferredTime}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Format: {apt.meetingType}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Activity Audit */}
      <div className="bg-[#0D172A] rounded border border-[#1E3352] p-6 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Cryptographic Activity Log (Simulated)
        </h3>
        <div className="font-mono text-xs text-slate-400 space-y-1.5 bg-[#060B14] p-4 rounded border border-[#14233A]">
          <div>[2026-10-30 04:30:12 UTC] SECURE_NODE_SYNC: Node Zurich-DC-02 reports healthy active state.</div>
          <div>[2026-10-30 04:32:00 UTC] INQUIRY_RECEIVED: INQ-2026-8812 payload verified by schema engine.</div>
          <div>[2026-10-30 04:35:45 UTC] ADMIN_AUTH: Marcus Vance logged into administrative session via internal console.</div>
          <div>[2026-10-30 04:40:02 UTC] REPOSITORY_INTEGRITY: Public case study checksums verified against manifest.</div>
        </div>
      </div>
    </div>
  );
}

