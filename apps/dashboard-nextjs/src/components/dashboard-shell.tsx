"use client";

import {
  Bell,
  BookOpen,
  Boxes,
  Building2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Gauge,
  LogOut,
  Menu,
  PackagePlus,
  Search,
  Settings,
  Truck,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  count?: number;
};

const userNav: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: Gauge },
  { href: "/dashboard/shipments", label: "Shipments", icon: Truck },
  { href: "/dashboard/shipments/new", label: "Create shipment", icon: PackagePlus },
  { href: "/materials", label: "UI materials", icon: BookOpen },
];

const adminNav: NavItem[] = [
  { href: "/admin", label: "Operations", icon: Gauge },
  { href: "/admin/orders", label: "Order approvals", icon: ClipboardCheck, count: 3 },
  { href: "/admin/rate-cards", label: "Rate cards", icon: CircleDollarSign },
  { href: "/admin/accounts", label: "Accounts", icon: Users },
  { href: "/materials", label: "UI materials", icon: BookOpen },
];

function Brand({ admin }: { admin: boolean }) {
  return (
    <Link href={admin ? "/admin" : "/dashboard"} className="flex items-center gap-3">
      <span className={`relative grid size-10 place-items-center ${
        admin
          ? "rounded-md border border-orange-200 bg-orange-50 text-brand-orange"
          : "rounded-xl bg-brand-orange text-white shadow-[0_8px_20px_rgba(249,115,22,.2)]"
      }`}>
        <Boxes size={22} strokeWidth={2.4} />
      </span>
      <span>
        <span className={`block font-extrabold text-navy ${admin ? "font-mono text-sm uppercase tracking-[0.12em]" : "text-lg tracking-[-0.04em]"}`}>
          {admin ? "ShipMe // OPS" : <>ShipMe<span className="text-brand-orange">.</span></>}
        </span>
        <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
          {admin ? "Control system" : "Workspace"}
        </span>
      </span>
    </Link>
  );
}

export function DashboardShell({
  children,
  mode,
}: {
  children: ReactNode;
  mode: "user" | "admin";
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const admin = mode === "admin";
  const nav = admin ? adminNav : userNav;
  const currentSection = [...nav]
    .reverse()
    .find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
    ?.label ?? (admin ? "Operations" : "Overview");

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-4">
        <Brand admin={admin} />
        <button onClick={() => setOpen(false)} className="rounded-lg p-2 text-slate-500 lg:hidden" aria-label="Close navigation">
          <X size={20} />
        </button>
      </div>
      <nav className={`flex-1 px-2.5 ${admin ? "mt-5 space-y-0.5" : "mt-3 space-y-1"}`} aria-label={`${mode} navigation`}>
        {nav.map((item) => {
          const active = item.href === "/dashboard" || item.href === "/admin"
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-2.5 px-3 py-2.5 font-semibold transition ${
                admin ? "rounded-md font-mono text-[11px] uppercase tracking-[0.08em]" : "rounded-xl text-sm"
              } ${
                active
                  ? admin ? "bg-orange-50 text-orange-800 shadow-[inset_3px_0_0_#f97316]" : "bg-blue-50 text-navy shadow-[inset_3px_0_0_#f97316]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-navy"
              }`}
            >
              <Icon size={admin ? 16 : 18} className={active ? "text-brand-orange" : "text-slate-400"} />
              <span className="flex-1">{item.label}</span>
              {item.count && (
                <span className={`grid size-6 place-items-center text-[10px] text-white ${admin ? "rounded bg-red-600" : "rounded-full bg-brand-orange"}`}>{item.count}</span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className={`m-2.5 border border-slate-200 bg-white p-2.5 shadow-sm ${admin ? "rounded-md" : "rounded-xl"}`}>
        <div className="flex items-center gap-3">
          <div className={`grid size-8 place-items-center font-bold ${admin ? "rounded bg-orange-50 font-mono text-[10px] text-brand-orange" : "rounded-lg bg-blue-100 text-xs text-navy"}`}>
            {admin ? "OP" : "EW"}
          </div>
          <div className="min-w-0 flex-1">
            <p className={`truncate text-xs font-bold text-navy ${admin ? "font-mono uppercase tracking-wide" : ""}`}>{admin ? "Operations Team" : "Ernest Wong"}</p>
            <p className="truncate text-[10px] text-slate-400">{admin ? "Level 04 clearance" : "Growth plan"}</p>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${admin ? "admin-console bg-slate-50" : "bg-canvas"}`}>
      <aside className={`fixed inset-y-0 left-0 z-40 hidden w-56 border-r lg:block ${
        admin ? "admin-light-grid border-slate-200 bg-slate-50" : "border-blue-100 bg-white"
      }`}>{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Close menu overlay" />
          <aside className={`relative h-full w-64 shadow-2xl ${admin ? "admin-light-grid bg-slate-50" : "bg-white"}`}>{sidebar}</aside>
        </div>
      )}
      <div className="lg:pl-56">
        <header className={`sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-3 backdrop-blur-xl sm:px-5 ${
          admin ? "border-slate-200 bg-slate-50/95 text-navy" : "border-line/80 bg-white/90"
        }`}>
          <button onClick={() => setOpen(true)} className={`border border-line p-2.5 text-navy lg:hidden ${admin ? "rounded-md" : "rounded-xl"}`} aria-label="Open navigation">
            <Menu size={20} />
          </button>
          <div className="hidden min-w-30 border-r border-line pr-4 sm:block">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-400">{admin ? "HKG-OPS-01" : "Workspace"}</p>
              <p className={`truncate text-xs font-bold text-navy ${admin ? "font-mono uppercase" : ""}`}>{currentSection}</p>
            </div>
          <div className="relative hidden max-w-xs flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input className={`h-9 w-full pl-9 pr-3 text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-orange-100 ${
              admin ? "rounded-md border border-slate-200 bg-white text-navy focus:border-orange-300" : "rounded-xl bg-slate-100 focus:bg-white"
            }`} placeholder={admin ? "Command search: orders, accounts…" : "Search shipments…"} />
          </div>
          <div className="ml-auto flex items-center gap-2">
            {admin && <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-emerald-700 md:flex"><span className="size-1.5 animate-pulse rounded-full bg-emerald-500" /> Live operations</span>}
            <Link href={admin ? "/dashboard" : "/admin"} className={`hidden h-9 border px-3 text-[11px] font-bold transition sm:flex sm:items-center sm:gap-2 ${
              admin ? "rounded-md border-slate-300 bg-white font-mono uppercase tracking-wide text-slate-600 hover:border-orange-300 hover:text-brand-orange" : "rounded-xl border-line text-slate-600 hover:border-orange-200 hover:text-brand-orange"
            }`}>
              {admin ? <Truck size={15} /> : <Building2 size={15} />}
              {admin ? "User view" : "Admin view"}
            </Link>
            <button className={`relative border border-line bg-white p-2 text-slate-600 hover:bg-slate-100 ${admin ? "rounded-md" : "rounded-lg"}`} aria-label="Notifications">
              <Bell size={17} />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-brand-orange" />
            </button>
            <button className={`border border-line bg-white p-2 text-slate-600 hover:bg-slate-100 ${admin ? "rounded-md" : "rounded-lg"}`} aria-label="Settings">
              <Settings size={17} />
            </button>
          </div>
        </header>
        <main className={`mx-auto p-3 sm:p-5 ${admin ? "max-w-[1720px]" : "max-w-[1540px]"}`}>{children}</main>
        <footer className={`flex items-center justify-between px-5 pb-5 text-[10px] ${admin ? "font-mono uppercase tracking-wide text-slate-500" : "text-slate-400"}`}>
          <span>{admin ? "ShipMe operations control · HKG" : "ShipMe platform · Demo workspace"}</span>
          <span className="flex items-center gap-1"><LogOut size={12} /> Secure session</span>
        </footer>
      </div>
    </div>
  );
}
