"use client";

import { Badge, Button } from "@/components/ui/ui-kit";
import { money, shipments } from "@/lib/demo-data";
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

export function ShipmentTable() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 5;
  const filtered = useMemo(
    () =>
      shipments.filter((shipment) => {
        const matchesQuery = `${shipment.id} ${shipment.tracking} ${shipment.destination} ${shipment.carrier}`
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesQuery && (status === "All" || shipment.status === status);
      }),
    [query, status],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const rows = filtered.slice((page - 1) * perPage, page * perPage);

  function updateStatus(value: string) {
    setStatus(value);
    setPage(1);
  }

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row">
        <label className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            value={query}
            onChange={(event) => { setQuery(event.target.value); setPage(1); }}
            placeholder="Search tracking, destination or carrier"
            className="h-10 w-full rounded-xl border border-line bg-white pl-9 pr-3 text-xs focus:border-brand-orange focus:ring-2 focus:ring-orange-100"
          />
        </label>
        <label className="relative">
          <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <select value={status} onChange={(event) => updateStatus(event.target.value)} className="h-10 min-w-44 rounded-xl border border-line bg-white pl-9 pr-3 text-xs font-semibold">
            {["All", "In transit", "Delivered", "Pending approval", "Exception", "Draft"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] text-left">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-muted">
            <tr>
              <th className="px-5 py-3 font-bold">Shipment</th>
              <th className="px-4 py-3 font-bold">Destination</th>
              <th className="px-4 py-3 font-bold">Service</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 font-bold">ETA</th>
              <th className="px-5 py-3 text-right font-bold">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((shipment) => (
              <tr key={shipment.id} className="text-xs transition hover:bg-slate-50/80">
                <td className="px-5 py-4">
                  <p className="font-mono font-semibold text-navy">{shipment.id}</p>
                  <p className="mt-1 text-[10px] text-muted">{shipment.tracking}</p>
                </td>
                <td className="px-4 py-4 font-semibold text-ink">{shipment.destination}</td>
                <td className="px-4 py-4"><p className="font-semibold">{shipment.carrier}</p><p className="mt-0.5 text-[10px] text-muted">{shipment.service}</p></td>
                <td className="px-4 py-4"><Badge>{shipment.status}</Badge></td>
                <td className="px-4 py-4 text-muted">{shipment.eta}</td>
                <td className="px-5 py-4 text-right font-mono font-semibold text-navy">{money(shipment.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div className="grid min-h-48 place-items-center px-4 text-center">
            <div><p className="font-bold text-navy">No shipments found</p><p className="mt-1 text-xs text-muted">Try adjusting your search or status filter.</p></div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-line px-5 py-3">
        <p className="text-[11px] text-muted">Showing {rows.length} of {filtered.length} shipments</p>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" disabled={page === 1} onClick={() => setPage((value) => value - 1)} aria-label="Previous page"><ChevronLeft size={14} /></Button>
          <span className="font-mono text-[11px] text-muted">{page} / {pages}</span>
          <Button variant="secondary" size="sm" disabled={page === pages} onClick={() => setPage((value) => value + 1)} aria-label="Next page"><ChevronRight size={14} /></Button>
        </div>
      </div>
    </div>
  );
}
