"use client";

import { ShipmentTable } from "@/components/shipment-table";
import { NoticeDialog } from "@/components/ui/notice-dialog";
import { Badge, Button, Card, Field, SelectField, StatCard } from "@/components/ui/ui-kit";
import { AlertCircle, ArrowLeft, Boxes, CheckCircle2, CircleDollarSign, Info, PackageCheck, Plus, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MaterialsPage() {
  const [notice, setNotice] = useState<"info" | "warning" | null>(null);
  const [formMessage, setFormMessage] = useState("");

  return (
    <div className="min-h-screen bg-canvas">
      <header className="route-grid bg-navy text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-brand-orange"><Boxes size={21} /></span>
            <span><span className="block font-extrabold tracking-tight">ShipMe UI</span><span className="font-mono text-[9px] uppercase tracking-[0.18em] text-blue-200">Materials library</span></span>
          </Link>
          <div className="flex gap-2">
            <Link href="/dashboard" className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/15 px-3 text-xs font-bold text-blue-100 hover:bg-white/10"><ArrowLeft size={14} /> User</Link>
            <Link href="/admin" className="inline-flex h-9 items-center rounded-xl bg-white px-3 text-xs font-bold text-navy hover:bg-blue-50">Admin</Link>
          </div>
        </div>
        <div className="mx-auto max-w-[1440px] px-5 pb-12 pt-8 sm:px-8">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-300">Design system · v0.1</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">Operational clarity,<br />built from shared materials.</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100/70">A working inventory of ShipMe cards, data tables, controls, forms, and feedback patterns.</p>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] space-y-12 px-5 py-10 sm:px-8">
        <section>
          <SectionHeading number="01" title="Metrics & cards" description="Priority, context, and action at a glance." />
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Shipments today" value="47" detail="+8.4% week on week" icon={<Truck size={19} />} accent />
            <StatCard label="Approved value" value="HK$86.4K" detail="Across 39 orders" icon={<CircleDollarSign size={19} />} />
            <StatCard label="Delivered" value="94.8%" detail="Inside promised window" icon={<PackageCheck size={19} />} />
            <Card className="route-grid border-0 bg-navy p-5 text-white">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-orange-300">Network pulse</p>
              <p className="mt-3 text-2xl font-extrabold">Healthy</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-blue-100/70"><span className="size-2 rounded-full bg-emerald-400" /> 3 carriers connected</div>
            </Card>
          </div>
        </section>

        <section>
          <SectionHeading number="02" title="Actions & status" description="Buttons and labels use orange only for meaningful focus." />
          <Card className="mt-5 grid gap-7 p-5 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">Button variants</p>
              <div className="flex flex-wrap gap-3">
                <Button><Plus size={15} /> Primary action</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost action</Button>
                <Button variant="danger">Destructive</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">Status language</p>
              <div className="flex flex-wrap gap-2">{["In transit", "Delivered", "Pending approval", "Exception", "Draft", "Active", "Review"].map((status) => <Badge key={status}>{status}</Badge>)}</div>
            </div>
          </Card>
        </section>

        <section>
          <SectionHeading number="03" title="Notices & feedback" description="Contextual messages remain visible, specific, and actionable." />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <button onClick={() => setNotice("info")} className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg">
              <Info className="text-blue-700" size={20} /><p className="mt-3 text-sm font-extrabold text-blue-900">Information notice</p><p className="mt-1 text-xs leading-5 text-blue-700">Use for pickup windows and neutral operational context.</p>
            </button>
            <button onClick={() => setNotice("warning")} className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg">
              <AlertCircle className="text-amber-700" size={20} /><p className="mt-3 text-sm font-extrabold text-amber-900">Warning notice</p><p className="mt-1 text-xs leading-5 text-amber-700">Use when an operator must review before continuing.</p>
            </button>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <CheckCircle2 className="text-emerald-700" size={20} /><p className="mt-3 text-sm font-extrabold text-emerald-900">Inline success</p><p className="mt-1 text-xs leading-5 text-emerald-700">Order ORD-8172 was approved successfully.</p>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading number="04" title="Data table" description="Search, filter, pagination, statuses, and an empty state in one responsive pattern." />
          <Card className="mt-5 overflow-hidden"><ShipmentTable /></Card>
        </section>

        <section>
          <SectionHeading number="05" title="Form controls" description="Clear labels, predictable focus, and validation close to the action." />
          <Card className="mt-5 p-5 sm:p-7">
            <form className="grid gap-5 lg:grid-cols-[1fr_1fr_.8fr_auto] lg:items-end" onSubmit={(event) => { event.preventDefault(); setFormMessage("Rate request prepared successfully."); }}>
              <Field label="Account email" type="email" placeholder="ops@company.com" required />
              <SelectField label="Carrier"><option>DHL</option><option>FedEx</option><option>UPS</option></SelectField>
              <Field label="Parcel weight" type="number" min="0.1" step="0.1" placeholder="2.5" required hint="Kilograms" />
              <Button type="submit">Calculate rate</Button>
            </form>
            {formMessage && <p className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-700" role="status"><CheckCircle2 size={15} /> {formMessage}</p>}
          </Card>
        </section>
      </main>
      <NoticeDialog open={notice !== null} tone={notice ?? "info"} onClose={() => setNotice(null)} />
    </div>
  );
}

function SectionHeading({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="font-mono text-xs font-semibold text-brand-orange">{number}</span>
      <div><h2 className="text-xl font-extrabold tracking-tight text-navy">{title}</h2><p className="mt-1 text-sm text-muted">{description}</p></div>
    </div>
  );
}
