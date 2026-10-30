"use client";

import { useState } from "react";
import { MOCK_APPOINTMENTS } from "@/lib/data";
import { AppointmentItem } from "@/types";
import { Calendar, Clock, Video, Building2, Check, X, Shield, RefreshCw } from "lucide-react";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentItem[]>(MOCK_APPOINTMENTS);
  const [selectedApt, setSelectedApt] = useState<AppointmentItem | null>(null);

  const updateStatus = (id: string, newStatus: AppointmentItem["status"]) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    if (selectedApt && selectedApt.id === id) {
      setSelectedApt((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3352]">
        <div>
          <h1 className="text-2xl font-serif text-white">Consultation Calendar & Bookings</h1>
          <p className="text-xs text-slate-400 mt-1">
            Approve, reschedule, and manage executive briefings with enterprise clients.
          </p>
        </div>
      </div>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-[#0D172A] rounded border border-[#1E3352] p-5 flex flex-col justify-between hover:border-[#C59B27] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-[11px] text-[#C59B27]">{apt.bookingRef}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                    apt.status === "confirmed"
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      : apt.status === "pending"
                      ? "bg-amber-950 text-amber-300 border border-amber-800"
                      : apt.status === "cancelled"
                      ? "bg-red-950 text-red-300 border border-red-800"
                      : "bg-blue-950 text-blue-300 border border-blue-800"
                  }`}
                >
                  {apt.status}
                </span>
              </div>

              <h2 className="text-base font-semibold text-white">{apt.clientName}</h2>
              <div className="text-xs text-[#C59B27] font-medium">{apt.organization}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{apt.clientEmail}</div>

              <div className="mt-4 pt-4 border-t border-[#1E3352] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>{apt.preferredDate}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>{apt.preferredTime}</span>
                </div>
                <div className="text-[11px] text-slate-400 bg-[#080E1B] p-2.5 rounded border border-[#16243B] mt-2">
                  <strong className="text-slate-300 block mb-0.5">Topic / Practice:</strong>
                  {apt.serviceRequested}
                </div>
                {apt.notes && (
                  <div className="text-[10px] text-slate-400 italic">
                    Note: {apt.notes}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#1E3352] flex items-center justify-between gap-2">
              {apt.status === "pending" && (
                <>
                  <button
                    onClick={() => updateStatus(apt.id, "confirmed")}
                    className="flex-1 py-1.5 px-3 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => updateStatus(apt.id, "rescheduled")}
                    className="py-1.5 px-3 rounded bg-[#16243B] hover:bg-[#1E3352] text-slate-200 text-xs border border-[#1E3352]"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => updateStatus(apt.id, "cancelled")}
                    className="py-1.5 px-2 rounded bg-red-950/70 hover:bg-red-900 text-red-300 text-xs border border-red-800"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </>
              )}

              {apt.status === "confirmed" && (
                <div className="w-full flex items-center justify-between text-xs">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Calendar Hold Confirmed
                  </span>
                  <button
                    onClick={() => updateStatus(apt.id, "completed")}
                    className="px-2.5 py-1 rounded bg-[#16243B] text-slate-300 hover:text-white text-[11px]"
                  >
                    Mark Done
                  </button>
                </div>
              )}

              {(apt.status === "completed" || apt.status === "cancelled" || apt.status === "rescheduled") && (
                <button
                  onClick={() => updateStatus(apt.id, "pending")}
                  className="w-full py-1.5 rounded bg-[#16243B] hover:bg-[#1E3352] text-slate-300 text-xs flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3 text-[#C59B27]" />
                  <span>Reopen Booking Slot</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
