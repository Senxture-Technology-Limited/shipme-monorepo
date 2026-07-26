import { Badge, Card, PageHeader, StatCard } from "@/components/ui/ui-kit";
import { money, orders } from "@/lib/demo-data";
import { AlertTriangle, ArrowRight, CircleDollarSign, ClipboardCheck, Clock3, PackageCheck, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const bars = [42, 58, 49, 72, 64, 81, 76];

export default function AdminDashboardPage() {
  return (
    <div className="page-enter space-y-5">
      <PageHeader
        eyebrow="Operations control"
        title="Daily command centre"
        description="Approvals, exceptions, and commercial performance across the ShipMe network."
        action={
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">Platform status</p>
            <p className="mt-0.5 flex items-center gap-2 text-xs font-bold text-emerald-800"><span className="size-2 rounded-full bg-emerald-500" /> All systems normal</p>
          </div>
        }
      />

      <div className="stagger grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending approvals" value="03" detail="1 high-value review" icon={<ClipboardCheck size={19} />} accent />
        <StatCard label="Orders today" value="47" detail="+8.4% vs. last Friday" icon={<PackageCheck size={19} />} />
        <StatCard label="Gross revenue" value="HK$86.4K" detail="+12.1% week on week" icon={<CircleDollarSign size={19} />} />
        <StatCard label="Active accounts" value="318" detail="6 onboarded this month" icon={<Users size={19} />} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_.75fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div><h2 className="font-extrabold text-navy">Approval queue</h2><p className="text-xs text-muted">Orders awaiting an operations decision</p></div>
            <Link href="/admin/orders" className="flex items-center gap-1 text-xs font-bold text-brand-orange">Review queue <ArrowRight size={14} /></Link>
          </div>
          <div className="divide-y divide-line">
            {orders.filter((order) => order.status === "Pending").map((order) => (
              <div key={order.id} className="grid gap-3 px-5 py-4 transition hover:bg-slate-50 sm:grid-cols-[1.2fr_.8fr_.7fr_auto] sm:items-center">
                <div><p className="font-mono text-xs font-semibold text-navy">{order.id}</p><p className="mt-0.5 text-xs font-bold">{order.account}</p></div>
                <div><p className="text-xs font-bold">{order.route}</p><p className="mt-0.5 text-[10px] text-muted">{order.parcels} parcels</p></div>
                <div><p className="font-mono text-xs font-semibold">{money(order.value)}</p><p className="mt-0.5 text-[10px] text-muted">{order.submitted}</p></div>
                <Badge>{order.risk}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div><h2 className="font-extrabold text-navy">Order velocity</h2><p className="text-xs text-muted">Last seven days</p></div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600"><TrendingUp size={14} /> 8.4%</span>
          </div>
          <div className="mt-8 flex h-40 items-end gap-3">
            {bars.map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="relative flex h-32 w-full items-end overflow-hidden rounded-lg bg-slate-100">
                  <div className={`w-full rounded-lg ${index === bars.length - 1 ? "bg-brand-orange" : "bg-navy/85"}`} style={{ height: `${height}%` }} />
                </div>
                <span className="font-mono text-[9px] text-muted">{["S", "M", "T", "W", "T", "F", "S"][index]}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2"><AlertTriangle size={17} className="text-red-500" /><h2 className="font-extrabold text-navy">Exceptions requiring action</h2><span className="ml-auto rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">4 open</span></div>
          {[
            ["Customs documentation missing", "SHP-20471 · Sydney", "12 min"],
            ["Rate mismatch above threshold", "ORD-8168 · FedEx", "34 min"],
            ["Account credit limit reached", "Aperture Retail", "1 hr"],
          ].map(([title, detail, time]) => (
            <div key={title} className="flex items-center gap-3 border-t border-line py-3 first:border-0">
              <span className="size-2 rounded-full bg-red-500" />
              <div className="flex-1"><p className="text-xs font-bold">{title}</p><p className="text-[10px] text-muted">{detail}</p></div>
              <span className="text-[10px] text-muted">{time}</span>
            </div>
          ))}
        </Card>
        <Card className="admin-service-panel overflow-hidden p-5">
          <div className="flex items-start justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-orange">Service target</p><h2 className="mt-2 text-xl font-extrabold text-navy">92% same-day approval</h2></div><Clock3 className="text-brand-orange" /></div>
          <p className="mt-2 max-w-md text-xs leading-5 text-slate-600">Today’s median review time is 18 minutes, comfortably inside the 30-minute operations target.</p>
          <div className="mt-6 h-2 rounded-full bg-blue-100"><div className="h-full w-[92%] rounded-full bg-navy" /></div>
          <div className="mt-2 flex justify-between text-[10px] text-slate-500"><span>Current SLA</span><span>92 / 100</span></div>
        </Card>
      </div>
    </div>
  );
}
