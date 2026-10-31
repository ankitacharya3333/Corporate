"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Check, X, RefreshCw, Trash2, Loader2, AlertCircle } from "lucide-react";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("10:00 AM EST");

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/appointments", window.location.origin);
      if (statusFilter !== "ALL") url.searchParams.set("status", statusFilter);
      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setAppointments(data.appointments || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  const updateStatus = async (
    id: string,
    newStatus: string,
    additionalData?: { appointmentDate?: string; appointmentTime?: string }
  ) => {
    try {
      const payload: any = { bookingStatus: newStatus, ...additionalData };
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) =>
            a.id === id ? { ...a, bookingStatus: newStatus, ...additionalData } : a
          )
        );
        setReschedulingId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently remove this appointment record from PostgreSQL?")) return;
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3352]">
        <div>
          <h1 className="text-2xl font-serif text-white">Consultation Calendar & Bookings</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time appointment requests stored in PostgreSQL with automated email confirmations on approval / reschedule.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded bg-[#0D172A] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
          >
            <option value="ALL">All Bookings</option>
            <option value="PENDING">Pending Approval</option>
            <option value="CONFIRMED">Confirmed Slots</option>
            <option value="RESCHEDULED">Rescheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <button
            onClick={fetchAppointments}
            className="p-2 rounded bg-[#16243B] hover:bg-[#1E3352] text-slate-300 hover:text-white border border-[#1E3352]"
            title="Refresh database records"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400 flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[#C59B27]" />
          <span>Querying appointments from database...</span>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-[#0D172A] rounded border border-[#1E3352] p-12 text-center text-slate-500 text-xs">
          No appointments found matching current filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-[#0D172A] rounded border border-[#1E3352] p-5 flex flex-col justify-between hover:border-[#C59B27] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-[11px] text-[#C59B27]">{apt.referenceNumber}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                      apt.bookingStatus === "CONFIRMED"
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        : apt.bookingStatus === "PENDING"
                        ? "bg-amber-950 text-amber-300 border border-amber-800"
                        : apt.bookingStatus === "CANCELLED"
                        ? "bg-red-950 text-red-300 border border-red-800"
                        : "bg-blue-950 text-blue-300 border border-blue-800"
                    }`}
                  >
                    {apt.bookingStatus}
                  </span>
                </div>

                <h2 className="text-base font-semibold text-white">{apt.customerName}</h2>
                <div className="text-xs text-[#C59B27] font-medium">{apt.organization || "Direct Client"}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{apt.email}</div>

                <div className="mt-4 pt-4 border-t border-[#1E3352] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>{apt.appointmentDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>{apt.appointmentTime}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 bg-[#080E1B] p-2.5 rounded border border-[#16243B] mt-2">
                    <strong className="text-slate-300 block mb-0.5">Topic / Practice:</strong>
                    {apt.selectedService}
                  </div>
                  {apt.message && (
                    <div className="text-[10px] text-slate-400 italic line-clamp-2">
                      Brief: {apt.message}
                    </div>
                  )}
                </div>

                {/* Inline Reschedule Dialog */}
                {reschedulingId === apt.id && (
                  <div className="mt-4 p-3 rounded bg-[#080E1B] border border-[#C59B27]/40 space-y-3">
                    <div className="text-xs font-semibold text-white">Select New Date & Time</div>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-2 py-1 text-xs rounded bg-[#16243B] border border-[#1E3352] text-white"
                    />
                    <select
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full px-2 py-1 text-xs rounded bg-[#16243B] border border-[#1E3352] text-white"
                    >
                      <option value="09:00 AM EST / 15:00 CET">09:00 AM EST / 15:00 CET</option>
                      <option value="11:30 AM EST / 17:30 CET">11:30 AM EST / 17:30 CET</option>
                      <option value="02:30 PM EST / 20:30 CET">02:30 PM EST / 20:30 CET</option>
                      <option value="04:30 PM EST">04:30 PM EST</option>
                    </select>
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => setReschedulingId(null)}
                        className="px-2 py-1 rounded text-[11px] text-slate-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(apt.id, "RESCHEDULED", {
                            appointmentDate: newDate || apt.appointmentDate,
                            appointmentTime: newTime,
                          })
                        }
                        className="px-3 py-1 rounded bg-[#C59B27] text-[#0B1528] text-xs font-bold"
                      >
                        Confirm & Notify
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-[#1E3352] flex items-center justify-between gap-2">
                {apt.bookingStatus === "PENDING" && (
                  <>
                    <button
                      onClick={() => updateStatus(apt.id, "CONFIRMED")}
                      className="flex-1 py-1.5 px-3 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => {
                        setReschedulingId(apt.id);
                        setNewDate(apt.appointmentDate);
                      }}
                      className="py-1.5 px-3 rounded bg-[#16243B] hover:bg-[#1E3352] text-slate-200 text-xs border border-[#1E3352]"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => updateStatus(apt.id, "CANCELLED")}
                      className="py-1.5 px-2 rounded bg-red-950/70 hover:bg-red-900 text-red-300 text-xs border border-red-800"
                      title="Reject / Cancel"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}

                {apt.bookingStatus === "CONFIRMED" && (
                  <div className="w-full flex items-center justify-between text-xs">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Slot Confirmed
                    </span>
                    <button
                      onClick={() => updateStatus(apt.id, "COMPLETED")}
                      className="px-2.5 py-1 rounded bg-[#16243B] text-slate-300 hover:text-white text-[11px]"
                    >
                      Mark Completed
                    </button>
                  </div>
                )}

                {["COMPLETED", "CANCELLED", "RESCHEDULED"].includes(apt.bookingStatus) && (
                  <div className="w-full flex items-center justify-between text-xs">
                    <button
                      onClick={() => updateStatus(apt.id, "PENDING")}
                      className="text-slate-400 hover:text-[#C59B27] text-xs flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reopen to Pending</span>
                    </button>
                    <button
                      onClick={() => handleDelete(apt.id)}
                      className="text-slate-500 hover:text-red-400"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
