"use client";

import { Badge, Button, Card, PageHeader } from "@/components/ui/ui-kit";
import { money, orders as initialOrders } from "@/lib/demo-data";
import type { Order } from "@/lib/types";
import { Check, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [notice, setNotice] = useState<string | null>(null);
  const filtered = useMemo(() => orders.filter((order) =>
    `${order.id} ${order.account} ${order.route}`.toLowerCase().includes(query.toLowerCase()) &&
    (status === "All" || order.status === status)
  ), [orders, query, status]);

  function decide(order: Order, nextStatus: "Approved" | "Rejected") {
    setOrders((current) => current.map((item) => item.id === order.id ? { ...item, status: nextStatus } : item));
    setNotice(`${order.id} was ${nextStatus.toLowerCase()}.`);
  }

  return (
    <div className="page-enter space-y-5">
      <PageHeader eyebrow="Operations workflow" title="Order approvals" description="Review submitted shipments, investigate risk flags, and record an approval decision." />
      {notice && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
          <Check size={17} /><span className="font-semibold">{notice}</span>
          <button className="ml-auto" onClick={() => setNotice(null)} aria-label="Dismiss notice"><X size={16} /></button>
        </div>
      )}
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row">
          <label className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 w-full rounded-xl border border-line pl-9 pr-3 text-xs focus:border-brand-orange" placeholder="Search order or account" /></label>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-10 rounded-xl border border-line bg-white px-3 text-xs font-semibold">
            {["All", "Pending", "Approved", "Rejected"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-muted"><tr><th className="px-5 py-3">Order</th><th className="px-4 py-3">Account</th><th className="px-4 py-3">Route</th><th className="px-4 py-3">Value</th><th className="px-4 py-3">Risk</th><th className="px-4 py-3">Status</th><th className="px-5 py-3 text-right">Decision</th></tr></thead>
            <tbody className="divide-y divide-line">
              {filtered.map((order) => (
                <tr key={order.id} className="text-xs hover:bg-slate-50/70">
                  <td className="px-5 py-4"><p className="font-mono font-semibold text-navy">{order.id}</p><p className="mt-1 text-[10px] text-muted">{order.submitted}</p></td>
                  <td className="px-4 py-4 font-bold">{order.account}</td>
                  <td className="px-4 py-4"><p className="font-semibold">{order.route}</p><p className="mt-1 text-[10px] text-muted">{order.parcels} parcels</p></td>
                  <td className="px-4 py-4 font-mono font-semibold">{money(order.value)}</td>
                  <td className="px-4 py-4"><Badge>{order.risk}</Badge></td>
                  <td className="px-4 py-4"><Badge>{order.status}</Badge></td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="secondary" disabled={order.status !== "Pending"} onClick={() => decide(order, "Rejected")}><X size={14} /> Reject</Button>
                      <Button size="sm" disabled={order.status !== "Pending"} onClick={() => decide(order, "Approved")}><Check size={14} /> Approve</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
