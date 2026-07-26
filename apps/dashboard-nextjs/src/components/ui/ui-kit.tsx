import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-brand-orange text-white shadow-[0_8px_20px_rgba(249,115,22,.2)] hover:bg-brand-orange-dark",
    secondary: "border border-line bg-white text-navy hover:border-slate-300 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-navy",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={cx(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-45",
        size === "sm" ? "h-8 px-3 text-[11px]" : "h-10 px-4 text-sm",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cx("panel", className)}>{children}</section>;
}

const badgeStyles: Record<string, string> = {
  "In transit": "bg-blue-50 text-blue-700",
  Delivered: "bg-emerald-50 text-emerald-700",
  Active: "bg-emerald-50 text-emerald-700",
  Approved: "bg-emerald-50 text-emerald-700",
  Exception: "bg-red-50 text-red-700",
  Rejected: "bg-red-50 text-red-700",
  Suspended: "bg-red-50 text-red-700",
  "Pending approval": "bg-amber-50 text-amber-700",
  Pending: "bg-amber-50 text-amber-700",
  Review: "bg-amber-50 text-amber-700",
  Draft: "bg-slate-100 text-slate-600",
};

export function Badge({ children }: { children: ReactNode }) {
  const label = String(children);
  return (
    <span className={cx("inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold", badgeStyles[label] ?? "bg-slate-100 text-slate-700")}>
      {children}
    </span>
  );
}

export function Field({
  label,
  hint,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
      {label}
      <input
        className={cx("h-10 rounded-xl border border-line bg-white px-3 text-sm font-normal text-ink placeholder:text-slate-400 focus:border-brand-orange focus:ring-2 focus:ring-orange-100", className)}
        {...props}
      />
      {hint && <span className="text-xs font-normal text-muted">{hint}</span>}
    </label>
  );
}

export function SelectField({
  label,
  children,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
      {label}
      <select
        className={cx("h-10 rounded-xl border border-line bg-white px-3 text-sm font-normal text-ink focus:border-brand-orange focus:ring-2 focus:ring-orange-100", className)}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">{eyebrow}</p>
        <h1 className="text-2xl font-extrabold tracking-[-0.035em] text-navy">{title}</h1>
        <p className="mt-1 max-w-2xl text-[13px] leading-5 text-slate-500">{description}</p>
      </div>
      {action}
    </header>
  );
}

export function StatCard({
  label,
  value,
  detail,
  icon,
  accent = false,
}: {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
  accent?: boolean;
}) {
  return (
    <Card className={cx("relative overflow-hidden p-4", accent && "border-orange-200 bg-orange-50/50")}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">{label}</p>
          <p className="mt-1.5 text-xl font-extrabold tracking-tight text-navy">{value}</p>
          <p className="mt-1 text-xs text-muted">{detail}</p>
        </div>
        <div className={cx("grid size-9 place-items-center rounded-lg", accent ? "bg-brand-orange text-white" : "bg-slate-100 text-navy")}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
