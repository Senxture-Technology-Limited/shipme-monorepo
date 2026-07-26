"use client";

import { AlertTriangle, Info, X } from "lucide-react";
import { Button } from "./ui-kit";

export function NoticeDialog({
  open,
  onClose,
  tone = "info",
}: {
  open: boolean;
  onClose: () => void;
  tone?: "info" | "warning";
}) {
  if (!open) return null;
  const warning = tone === "warning";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="notice-title" aria-describedby="notice-description">
      <button className="absolute inset-0" onClick={onClose} aria-label="Close notice" />
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Close"><X size={18} /></button>
        <div className={`grid size-12 place-items-center rounded-2xl ${warning ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-700"}`}>
          {warning ? <AlertTriangle size={23} /> : <Info size={23} />}
        </div>
        <h2 id="notice-title" className="mt-5 text-xl font-extrabold text-navy">{warning ? "Rate needs review" : "Shipment notice"}</h2>
        <p id="notice-description" className="mt-2 text-sm leading-6 text-muted">
          {warning ? "This order exceeds the account’s standard rate threshold. Confirm the commercial terms before approval." : "Carrier pickup is scheduled for 16:00–18:00 today. Ensure all parcels are labelled and ready."}
        </p>
        <div className="mt-6 flex justify-end gap-2"><Button variant="secondary" onClick={onClose}>Not now</Button><Button onClick={onClose}>{warning ? "Review rate" : "Got it"}</Button></div>
      </div>
    </div>
  );
}
