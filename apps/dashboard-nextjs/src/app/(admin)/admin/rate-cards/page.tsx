"use client";

import { Badge, Button, Card, Field, PageHeader, SelectField } from "@/components/ui/ui-kit";
import { money, rateCards } from "@/lib/demo-data";
import { Pencil, Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function RateCardsPage() {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const cards = useMemo(() => rateCards.filter((card) => `${card.carrier} ${card.service} ${card.zone}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <div className="page-enter space-y-5">
      <PageHeader eyebrow="Commercial controls" title="Rate cards" description="Manage carrier services, zone pricing, and active commercial terms." action={<Button onClick={() => setEditing("new")}><Plus size={16} /> Add rate card</Button>} />
      <Card className="overflow-hidden">
        <div className="border-b border-line p-4">
          <label className="relative block max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 w-full rounded-xl border border-line pl-9 pr-3 text-xs" placeholder="Search carrier, service or zone" /></label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-muted"><tr><th className="px-5 py-3">Carrier / service</th><th className="px-4 py-3">Zone</th><th className="px-4 py-3">Base / kg</th><th className="px-4 py-3">Fuel surcharge</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3">Status</th><th className="px-5 py-3 text-right">Edit</th></tr></thead>
            <tbody className="divide-y divide-line">
              {cards.map((card) => (
                <tr key={card.id} className="text-xs hover:bg-slate-50">
                  <td className="px-5 py-4"><p className="font-bold text-navy">{card.carrier} · {card.service}</p><p className="mt-1 font-mono text-[10px] text-muted">{card.id}</p></td>
                  <td className="px-4 py-4 font-semibold">{card.zone}</td>
                  <td className="px-4 py-4 font-mono font-semibold">{money(card.pricePerKg)}</td>
                  <td className="px-4 py-4">{card.fuelSurcharge}%</td>
                  <td className="px-4 py-4 text-muted">{card.updated}</td>
                  <td className="px-4 py-4"><Badge>{card.status}</Badge></td>
                  <td className="px-5 py-4 text-right"><Button size="sm" variant="secondary" onClick={() => setEditing(card.id)}><Pencil size={13} /> Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="rate-card-title">
          <form className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl" onSubmit={(event) => { event.preventDefault(); setEditing(null); }}>
            <button type="button" onClick={() => setEditing(null)} className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Close"><X size={18} /></button>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-orange">{editing === "new" ? "New commercial term" : editing}</p>
            <h2 id="rate-card-title" className="mt-1 text-xl font-extrabold text-navy">{editing === "new" ? "Add rate card" : "Edit rate card"}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <SelectField label="Carrier"><option>DHL</option><option>FedEx</option><option>UPS</option></SelectField>
              <SelectField label="Zone"><option>Asia Pacific</option><option>North America</option><option>Europe</option></SelectField>
              <Field label="Service name" placeholder="Express Worldwide" required className="sm:col-span-2" />
              <Field label="Price per kg (HKD)" type="number" min="0" placeholder="86" required />
              <Field label="Fuel surcharge (%)" type="number" min="0" step="0.25" placeholder="18.5" required />
              <SelectField label="Status" className="sm:col-span-2"><option>Active</option><option>Draft</option></SelectField>
            </div>
            <div className="mt-6 flex justify-end gap-2"><Button type="button" variant="secondary" onClick={() => setEditing(null)}>Cancel</Button><Button type="submit">Save rate card</Button></div>
          </form>
        </div>
      )}
    </div>
  );
}
