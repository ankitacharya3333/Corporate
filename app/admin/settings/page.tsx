"use client";

import { useState } from "react";
import { COMPANY_PROFILE } from "@/lib/data";
import { Settings, Shield, Bell, Key, Save, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [adminName, setAdminName] = useState("Marcus Vance");
  const [adminRole, setAdminRole] = useState("Chief Systems Architect & Principal");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsUrgent, setSmsUrgent] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-[#1E3352]">
        <h1 className="text-2xl font-serif text-white">System Governance & Administrative Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure security policies, partner identity attributes, and automated advisory alert routing.
        </p>
      </div>

      {saved && (
        <div className="p-3 rounded bg-[#0A2616] border border-emerald-600 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Settings saved to local administrative session state.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Administrator Profile */}
        <div className="bg-[#0D172A] p-6 rounded border border-[#1E3352] space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C59B27] pb-2 border-b border-[#1E3352]">
            <Shield className="w-4 h-4" />
            <span>Administrator Identity</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Authorized Full Name
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Practice Title
              </label>
              <input
                type="text"
                value={adminRole}
                onChange={(e) => setAdminRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
              />
            </div>
          </div>
        </div>

        {/* Security Credentials & Passphrase */}
        <div className="bg-[#0D172A] p-6 rounded border border-[#1E3352] space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C59B27] pb-2 border-b border-[#1E3352]">
            <Key className="w-4 h-4" />
            <span>Passphrase & Hardware Token (FIDO2)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Current Passphrase
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full px-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                New Passphrase (Min 14 characters)
              </label>
              <input
                type="password"
                placeholder="Enter new passkey"
                className="w-full px-3 py-2 text-xs rounded bg-[#080E1B] border border-[#1E3352] text-white focus:outline-none focus:border-[#C59B27]"
              />
            </div>
          </div>
          <div className="text-[11px] text-slate-400">
            Phase 2 will bind this to WebAuthn / YubiKey physical challenge-response signatures.
          </div>
        </div>

        {/* Notifications & Alert Routing */}
        <div className="bg-[#0D172A] p-6 rounded border border-[#1E3352] space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C59B27] pb-2 border-b border-[#1E3352]">
            <Bell className="w-4 h-4" />
            <span>Advisory Alert Dispatch</span>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded border-[#1E3352] text-[#C59B27] bg-[#080E1B] focus:ring-0"
              />
              <span className="text-xs text-slate-300">
                Transmit instant PGP-encrypted notifications when new institutional inquiries are received.
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsUrgent}
                onChange={(e) => setSmsUrgent(e.target.checked)}
                className="rounded border-[#1E3352] text-[#C59B27] bg-[#080E1B] focus:ring-0"
              />
              <span className="text-xs text-slate-300">
                Trigger high-priority partner escalation for enterprise consultation booking requests within 15 minutes.
              </span>
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded bg-[#C59B27] hover:bg-[#B38A1F] text-[#0B1528] font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
