"use client";

import { Badge, Button, Card, PageHeader } from "@/components/ui/ui-kit";
import { accounts as initialAccounts, money } from "@/lib/demo-data";
import type { Account } from "@/lib/types";
import { Building2, Mail, Search, ShieldCheck, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState<Account | null>(null);
  const filtered = useMemo(() => accounts.filter((account) =>
    `${account.company} ${account.contact} ${account.email}`.toLowerCase().includes(query.toLowerCase()) &&
    (status === "All" || account.status === status)
  ), [accounts, query, status]);

  function toggleAccount(account: Account) {
    const next = account.status === "Suspended" ? "Active" : "Suspended";
    setAccounts((current) => current.map((item) => item.id === account.id ? { ...item, status: next } : item));
    setSelected(null);
  }

  return (
    <div className="page-enter space-y-5">
      <PageHeader eyebrow="Customer administration" title="Accounts" description="Review customer activity, plan tiers, and account access status." />
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row">
          <label className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 w-full rounded-xl border border-line pl-9 pr-3 text-xs" placeholder="Search company, contact or email" /></label>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-10 rounded-xl border border-line bg-white px-3 text-xs font-semibold">{["All", "Active", "Review", "Suspended"].map((item) => <option key={item}>{item}</option>)}</select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-muted"><tr><th className="px-5 py-3">Company</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Plan</th><th className="px-4 py-3">Orders</th><th className="px-4 py-3">Lifetime spend</th><th className="px-4 py-3">Status</th><th className="px-5 py-3 text-right">Manage</th></tr></thead>
            <tbody className="divide-y divide-line">
              {filtered.map((account) => (
                <tr key={account.id} className="text-xs hover:bg-slate-50">
                  <td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-navy"><Building2 size={16} /></span><div><p className="font-bold text-navy">{account.company}</p><p className="mt-0.5 font-mono text-[9px] text-muted">{account.id}</p></div></div></td>
                  <td className="px-4 py-4"><p className="font-semibold">{account.contact}</p><p className="mt-1 text-[10px] text-muted">{account.email}</p></td>
                  <td className="px-4 py-4 font-semibold">{account.tier}</td>
                  <td className="px-4 py-4 font-mono font-semibold">{account.orders}</td>
                  <td className="px-4 py-4 font-mono font-semibold">{money(account.spend)}</td>
                  <td className="px-4 py-4"><Badge>{account.status}</Badge></td>
                  <td className="px-5 py-4 text-right"><Button size="sm" variant="secondary" onClick={() => setSelected(account)}>View account</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/45 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="account-title">
          <button className="absolute inset-0" onClick={() => setSelected(null)} aria-label="Close account details" />
          <aside className="relative h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl">
            <button onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Close"><X size={18} /></button>
            <div className="grid size-14 place-items-center rounded-2xl bg-navy text-white"><Building2 size={24} /></div>
            <h2 id="account-title" className="mt-5 text-xl font-extrabold text-navy">{selected.company}</h2>
            <div className="mt-2"><Badge>{selected.status}</Badge></div>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-muted">Orders</p><p className="mt-1 font-mono text-xl font-semibold text-navy">{selected.orders}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-muted">Spend</p><p className="mt-1 font-mono text-lg font-semibold text-navy">{money(selected.spend)}</p></div>
            </div>
            <div className="mt-6 space-y-4 border-y border-line py-5">
              <div className="flex gap-3"><Mail size={17} className="text-brand-orange" /><div><p className="text-xs font-bold">{selected.contact}</p><p className="text-[11px] text-muted">{selected.email}</p></div></div>
              <div className="flex gap-3"><ShieldCheck size={17} className="text-brand-orange" /><div><p className="text-xs font-bold">{selected.tier} plan</p><p className="text-[11px] text-muted">Standard account permissions</p></div></div>
            </div>
            <Button className="mt-6 w-full" variant={selected.status === "Suspended" ? "primary" : "danger"} onClick={() => toggleAccount(selected)}>
              {selected.status === "Suspended" ? "Reactivate account" : "Suspend account"}
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
