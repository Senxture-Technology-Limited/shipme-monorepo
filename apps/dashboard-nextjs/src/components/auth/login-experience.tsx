"use client";

import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
  MapPin,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginExperience({ mode }: { mode: "customer" | "admin" }) {
  const router = useRouter();
  const admin = mode === "admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!email.includes("@")) {
      setMessage("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }
    setLoading(true);
    window.setTimeout(() => router.push(admin ? "/admin" : "/dashboard"), 550);
  }

  if (admin) {
    return (
      <main className="admin-light-grid min-h-screen bg-slate-50 px-4 py-8 text-ink sm:px-6">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
          <header className="flex items-center justify-between border-b border-slate-200 pb-5">
            <Brand admin />
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Identity gateway online
            </div>
          </header>

          <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1fr_440px]">
            <section className="hidden max-w-xl lg:block">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-orange">Restricted operations system</p>
              <h1 className="mt-5 font-mono text-4xl font-semibold uppercase leading-[1.12] tracking-[-0.06em] text-navy">
                Control every<br />shipment decision.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
                Secure access for approvals, commercial rates, customer accounts, and network exceptions.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200">
                {[
                  ["HKG-OPS-01", "Primary node"],
                  ["24 / 7", "Monitoring"],
                  ["TLS 1.3", "Secure link"],
                ].map(([value, label]) => (
                  <div key={value} className="bg-white p-4">
                    <p className="font-mono text-sm font-semibold text-navy">{value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,35,64,.08)] sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-orange">Operator authentication</p>
                  <h2 className="mt-2 font-mono text-xl font-semibold uppercase text-navy">Admin sign in</h2>
                </div>
                <span className="grid size-10 place-items-center rounded-md bg-orange-50 text-brand-orange"><ShieldCheck size={20} /></span>
              </div>
              <LoginForm
                admin
                email={email}
                password={password}
                showPassword={showPassword}
                message={message}
                loading={loading}
                onEmail={setEmail}
                onPassword={setPassword}
                onTogglePassword={() => setShowPassword((value) => !value)}
                onSubmit={submit}
                onForgot={() => setMessage("Contact your system administrator to reset access.")}
              />
            </section>
          </div>

          <footer className="flex justify-between border-t border-slate-200 pt-4 font-mono text-[9px] uppercase tracking-wider text-slate-400">
            <span>ShipMe operations control</span><span>Authorized personnel only</span>
          </footer>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-ink lg:grid lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-blue-50 p-12 lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(249,115,22,.13),transparent_25%),radial-gradient(circle_at_85%_75%,rgba(0,45,95,.12),transparent_28%)]" />
        <div className="admin-light-grid absolute inset-0 opacity-60" />
        <div className="relative"><Brand /></div>
        <div className="relative my-auto max-w-xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-orange">Your shipping workspace</p>
          <h1 className="mt-5 text-5xl font-extrabold leading-[1.08] tracking-[-0.055em] text-navy">From your door<br />to anywhere.</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-600">Book international shipments, compare trusted carriers, and follow every delivery from one calm workspace.</p>
          <div className="mt-10 space-y-4">
            {[
              [PackageCheck, "One workspace for every shipment"],
              [MapPin, "Clear tracking from pickup to delivery"],
              [CheckCircle2, "Transparent rates before you book"],
            ].map(([Icon, text]) => (
              <div key={String(text)} className="flex items-center gap-3 text-sm font-semibold text-navy">
                <span className="grid size-9 place-items-center rounded-xl bg-white text-brand-orange shadow-sm"><Icon size={17} /></span>
                {String(text)}
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-slate-400">ShipMe · International delivery made simple</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden"><Brand /></div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-orange">Welcome back</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-navy">Sign in to ShipMe</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Access your shipments, quotes, and delivery activity.</p>
          <LoginForm
            email={email}
            password={password}
            showPassword={showPassword}
            message={message}
            loading={loading}
            onEmail={setEmail}
            onPassword={setPassword}
            onTogglePassword={() => setShowPassword((value) => !value)}
            onSubmit={submit}
            onForgot={() => setMessage("Password recovery is not connected in this demo.")}
          />
          <p className="mt-8 text-center text-xs text-slate-400">Need help? <a className="font-bold text-navy hover:text-brand-orange" href="mailto:support@shipme.hk">Contact support</a></p>
        </div>
      </section>
    </main>
  );
}

function Brand({ admin = false }: { admin?: boolean }) {
  return (
    <Link href={admin ? "/admin/login" : "/login"} className="inline-flex items-center gap-3">
      <span className={`grid size-10 place-items-center text-white ${admin ? "rounded-md bg-brand-orange" : "rounded-xl bg-brand-orange shadow-[0_8px_20px_rgba(249,115,22,.2)]"}`}>
        <Boxes size={21} />
      </span>
      <span>
        <span className={`block font-extrabold text-navy ${admin ? "font-mono text-sm uppercase tracking-[0.12em]" : "text-lg tracking-[-0.04em]"}`}>
          {admin ? "ShipMe // OPS" : <>ShipMe<span className="text-brand-orange">.</span></>}
        </span>
        <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">{admin ? "Identity gateway" : "Workspace"}</span>
      </span>
    </Link>
  );
}

type LoginFormProps = {
  admin?: boolean;
  email: string;
  password: string;
  showPassword: boolean;
  message: string;
  loading: boolean;
  onEmail: (value: string) => void;
  onPassword: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onForgot: () => void;
};

function LoginForm(props: LoginFormProps) {
  return (
    <form className="mt-8 space-y-5" onSubmit={props.onSubmit} noValidate>
      <label className="grid gap-2 text-xs font-bold text-slate-700">
        {props.admin ? "Operator email" : "Email address"}
        <span className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input
            value={props.email}
            onChange={(event) => props.onEmail(event.target.value)}
            type="email"
            autoComplete="email"
            placeholder={props.admin ? "operator@shipme.hk" : "you@company.com"}
            className={`h-11 w-full border border-slate-200 bg-white pl-10 pr-3 text-sm font-normal text-navy placeholder:text-slate-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 ${props.admin ? "rounded-md" : "rounded-xl"}`}
          />
        </span>
      </label>
      <label className="grid gap-2 text-xs font-bold text-slate-700">
        Password
        <span className="relative">
          <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input
            value={props.password}
            onChange={(event) => props.onPassword(event.target.value)}
            type={props.showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            className={`h-11 w-full border border-slate-200 bg-white pl-10 pr-11 text-sm font-normal text-navy placeholder:text-slate-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 ${props.admin ? "rounded-md" : "rounded-xl"}`}
          />
          <button type="button" onClick={props.onTogglePassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy" aria-label={props.showPassword ? "Hide password" : "Show password"}>
            {props.showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </span>
      </label>
      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2 font-medium text-slate-600"><input type="checkbox" className="size-4 accent-orange-500" /> Remember me</label>
        <button type="button" onClick={props.onForgot} className="font-bold text-navy hover:text-brand-orange">Forgot password?</button>
      </div>
      {props.message && <p role="alert" className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">{props.message}</p>}
      <button disabled={props.loading} className={`flex h-11 w-full items-center justify-center gap-2 bg-brand-orange px-4 text-sm font-bold text-white transition hover:bg-brand-orange-dark disabled:opacity-60 ${props.admin ? "rounded-md font-mono uppercase tracking-wide" : "rounded-xl"}`}>
        {props.loading ? "Opening workspace…" : props.admin ? "Authenticate" : "Sign in"}
        {!props.loading && (props.admin ? <KeyRound size={16} /> : <ArrowRight size={16} />)}
      </button>
      <p className="text-center text-[10px] leading-4 text-slate-400">Demo access · credentials are validated locally and are not authenticated.</p>
    </form>
  );
}
