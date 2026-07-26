import { Card, PageHeader } from "@/components/ui/ui-kit";
import { money, shipments } from "@/lib/demo-data";
import { AlertTriangle, ArrowRight, Box, CalendarClock, CircleDollarSign, PackagePlus, Plane, TrendingDown, Truck } from "lucide-react";
import Link from "next/link";

const metrics = [
  { label: "Active shipments", value: "06", detail: "4 on schedule", icon: Truck, accent: true },
  { label: "Delivered this month", value: "28", detail: "+12% from June", icon: Box },
  { label: "Shipping spend", value: "HK$12,840", detail: "HK$2,160 below budget", icon: CircleDollarSign },
  { label: "Avg. delivery", value: "2.8 days", detail: "0.4 days faster", icon: TrendingDown },
];

const progressColors = {
  "In transit": "bg-blue-500",
  "Pending approval": "bg-amber-500",
  Delivered: "bg-emerald-500",
  Exception: "bg-red-500",
  Draft: "bg-slate-400",
};

export default function UserDashboardPage() {
  return (
    <div className="page-enter space-y-5">
      <PageHeader
        eyebrow="Saturday, 25 July"
        title="Good evening, Ernest."
        description="Your shipping workspace is on track. Two deliveries need your attention this week."
        action={
          <Link href="/dashboard/shipments/new" className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 text-sm font-bold text-white shadow-[0_8px_20px_rgba(249,115,22,.2)] transition hover:bg-brand-orange-dark">
            <PackagePlus size={17} /> Create shipment
          </Link>
        }
      />

      <Card className="stagger grid overflow-hidden bg-line sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="flex items-start justify-between bg-white p-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">{metric.label}</p>
                <p className="mt-1.5 text-xl font-extrabold tracking-tight text-navy">{metric.value}</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">{metric.detail}</p>
              </div>
              <span className={`grid size-9 place-items-center rounded-lg ${metric.accent ? "bg-brand-orange text-white" : "bg-slate-100 text-navy"}`}>
                <Icon size={17} />
              </span>
            </div>
          );
        })}
      </Card>

      <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 sm:flex-row sm:items-center">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700"><AlertTriangle size={17} /></span>
        <div className="flex-1">
          <p className="text-sm font-bold text-amber-950">Customs document required for SHP-20471</p>
          <p className="text-xs text-amber-800">Upload the commercial invoice to avoid an additional delay.</p>
        </div>
        <Link href="/dashboard/shipments" className="text-xs font-bold text-amber-900 underline decoration-amber-400 underline-offset-4">Review shipment</Link>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_.8fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <h2 className="font-extrabold tracking-tight text-navy">Shipments in motion</h2>
              <p className="text-[13px] text-slate-500">Live overview of your active deliveries</p>
            </div>
            <Link href="/dashboard/shipments" className="flex items-center gap-1 text-xs font-bold text-brand-orange">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-line">
            {shipments.slice(0, 4).map((shipment) => (
              <div key={shipment.id} className="grid gap-4 px-5 py-3.5 transition hover:bg-slate-50/70 sm:grid-cols-[1.3fr_1fr_90px] sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-navy"><Plane size={18} /></div>
                  <div>
                    <p className="font-mono text-xs font-semibold text-navy">{shipment.tracking}</p>
                    <p className="mt-0.5 text-[13px] text-slate-500">{shipment.destination} · {shipment.carrier}</p>
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 flex justify-between text-[11px] font-semibold text-slate-600">
                    <span>{shipment.status}</span>
                    <span className="font-mono">{shipment.progress}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${progressColors[shipment.status]}`} style={{ width: `${shipment.progress}%` }} />
                  </div>
                </div>
                <div className="sm:text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Expected</p>
                  <p className={`mt-1 text-xs font-bold ${shipment.status === "Exception" ? "text-red-600" : "text-navy"}`}>{shipment.eta}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="overflow-hidden p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-orange">Budget remaining</p>
                <p className="mt-2 text-2xl font-extrabold tracking-tight text-navy">HK$4,160</p>
                <p className="mt-1 text-xs text-slate-500">of HK$17,000 this month</p>
              </div>
              <span className="grid size-9 place-items-center rounded-lg bg-orange-50 text-brand-orange"><CircleDollarSign size={18} /></span>
            </div>
            <div className="mt-5 h-2 rounded-full bg-slate-100"><div className="h-full w-3/4 rounded-full bg-navy" /></div>
            <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-500">
              <span>HK$12,840 used</span><span>75%</span>
            </div>
          </Card>
          <Card className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <CalendarClock size={17} className="text-brand-orange" />
              <h2 className="text-sm font-extrabold text-navy">Upcoming</h2>
            </div>
            <div className="space-y-4">
              {[
                ["28 Jul", "DHL delivery", "Singapore · 3 parcels"],
                ["31 Jul", "FedEx delivery", "London · 1 parcel"],
                ["02 Aug", "Invoice due", money(4280)],
              ].map(([date, title, detail]) => (
                <div key={title} className="flex gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-center font-mono text-[9px] font-bold text-navy">{date}</span>
                  <div><p className="text-xs font-bold text-ink">{title}</p><p className="mt-0.5 text-[11px] text-muted">{detail}</p></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
