"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  Loader2,
  RefreshCw,
} from "lucide-react";

interface DashboardData {
  stats: {
    totalCustomers: number;
    totalInquiries: number;
    newInquiries: number;
    pendingInquiries: number;
    totalAppointments: number;
    pendingAppointments: number;
    confirmedAppointments: number;
    totalServices: number;
    totalProjects: number;
  };
  recentInquiries: any[];
  recentAppointments: any[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dashboard");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading && !data) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-300 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-[#C59B27]" />
          <span>Querying PostgreSQL database metrics...</span>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    totalCustomers: 0,
    totalInquiries: 0,
    newInquiries: 0,
    pendingInquiries: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    totalServices: 0,
    totalProjects: 0,
  };

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
            Real-time management interface connected to production PostgreSQL database.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboard}
            className="p-2 rounded bg-[#16243B] hover:bg-[#1E3352] text-slate-300 hover:text-white border border-[#1E3352]"
            title="Refresh database metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link
            href="/admin/inquiries"
            className="px-3.5 py-2 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-xs tracking-wide transition-colors"
          >
            Review Inquiries ({stats.newInquiries} New)
          </Link>
          <Link
            href="/admin/appointments"
            className="px-3.5 py-2 rounded bg-[#16243B] hover:bg-[#1E3352] text-white text-xs border border-[#1E3352] transition-colors"
          >
            Manage Bookings ({stats.pendingAppointments} Pending)
          </Link>
        </div>
      </div>

      {/* Production Live Connection Status */}
      <div className="p-3 rounded bg-[#0A1A2E] border border-[#1E3B66] text-xs text-slate-300 flex items-start gap-3">
        <Shield className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Active Database Connection:</strong> Connected to PostgreSQL. All inquiries, consultation bookings, and user accounts update persistently in real time with transactional email dispatches to <span className="font-mono text-[#C59B27]">rmnrr333@gmail.com</span>.
        </div>
      </div>

      {/* Primary KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-[#0D172A] p-4 rounded border border-[#1E3352]">
          <div className="text-slate-400 text-[11px] font-medium flex items-center justify-between">
            <span>Inquiries</span>
            <MessageSquare className="w-3.5 h-3.5 text-[#C59B27]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{stats.totalInquiries}</div>
          <div className="text-[10px] text-[#C59B27] mt-1">{stats.newInquiries} unreviewed</div>
        </div>

        <div className="bg-[#0D172A] p-4 rounded border border-[#1E3352]">
          <div className="text-slate-400 text-[11px] font-medium flex items-center justify-between">
            <span>Appointments</span>
            <CalendarCheck className="w-3.5 h-3.5 text-[#C59B27]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{stats.totalAppointments}</div>
          <div className="text-[10px] text-amber-400 mt-1">{stats.pendingAppointments} pending review</div>
        </div>

        <div className="bg-[#0D172A] p-4 rounded border border-[#1E3352]">
          <div className="text-slate-400 text-[11px] font-medium flex items-center justify-between">
            <span>Enterprise Users</span>
            <Users className="w-3.5 h-3.5 text-[#C59B27]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{stats.totalCustomers}</div>
          <div className="text-[10px] text-emerald-400 mt-1">Verified DB accounts</div>
        </div>

        <div className="bg-[#0D172A] p-4 rounded border border-[#1E3352]">
          <div className="text-slate-400 text-[11px] font-medium flex items-center justify-between">
            <span>Practices</span>
            <Briefcase className="w-3.5 h-3.5 text-[#C59B27]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{stats.totalServices}</div>
          <div className="text-[10px] text-slate-400 mt-1">Active disciplines</div>
        </div>

        <div className="bg-[#0D172A] p-4 rounded border border-[#1E3352]">
          <div className="text-slate-400 text-[11px] font-medium flex items-center justify-between">
            <span>Case Studies</span>
            <Layers className="w-3.5 h-3.5 text-[#C59B27]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{stats.totalProjects}</div>
          <div className="text-[10px] text-slate-400 mt-1">Published architectures</div>
        </div>

        <div className="bg-[#0D172A] p-4 rounded border border-[#1E3352]">
          <div className="text-slate-400 text-[11px] font-medium flex items-center justify-between">
            <span>Approved Slots</span>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-2">{stats.confirmedAppointments}</div>
          <div className="text-[10px] text-slate-400 mt-1">Confirmed Briefings</div>
        </div>
      </div>

      {/* Two-Column Operation Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Inquiries */}
        <div className="lg:col-span-7 bg-[#0D172A] rounded border border-[#1E3352] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E3352]">
            <div>
              <h2 className="text-sm font-semibold text-white">Latest Database Inquiries</h2>
              <p className="text-[11px] text-slate-400">Direct client communications in PostgreSQL</p>
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
            {(!data?.recentInquiries || data.recentInquiries.length === 0) ? (
              <div className="text-xs text-slate-500 py-6 text-center">No inquiries currently in database.</div>
            ) : (
              data.recentInquiries.map((inq: any) => (
                <div
                  key={inq.id}
                  className="p-3.5 rounded bg-[#080E1B] border border-[#1E3352] hover:border-[#C59B27] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-white">{inq.organization || inq.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                      inq.status === "NEW"
                        ? "bg-amber-950/80 text-amber-300 border border-amber-800"
                        : inq.status === "IN_PROGRESS"
                        ? "bg-blue-950/80 text-blue-300 border border-blue-800"
                        : "bg-emerald-950/80 text-emerald-300 border border-emerald-800"
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">{inq.subject}</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{inq.message}</div>
                  <div className="mt-2 pt-2 border-t border-[#16243B] flex items-center justify-between text-[10px] text-slate-400">
                    <span>Sender: {inq.name} ({inq.email})</span>
                    <span className="font-mono text-[#C59B27]">{inq.ticketNumber}</span>
                  </div>
                </div>
              ))
            )}
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
            {(!data?.recentAppointments || data.recentAppointments.length === 0) ? (
              <div className="text-xs text-slate-500 py-6 text-center">No appointments scheduled.</div>
            ) : (
              data.recentAppointments.map((apt: any) => (
                <div
                  key={apt.id}
                  className="p-3.5 rounded bg-[#080E1B] border border-[#1E3352]"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-white">{apt.customerName}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      apt.bookingStatus === "CONFIRMED"
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        : "bg-amber-950 text-amber-300 border border-amber-800"
                    }`}>
                      {apt.bookingStatus}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">{apt.organization || "Direct Entity"}</div>
                  <div className="mt-2 text-xs text-[#C59B27] flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{apt.appointmentDate} &bull; {apt.appointmentTime}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Practice: {apt.selectedService}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
