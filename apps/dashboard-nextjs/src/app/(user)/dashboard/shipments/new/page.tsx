"use client";

import { Button, Card, Field, PageHeader, SelectField } from "@/components/ui/ui-kit";
import { ArrowLeft, Check, CheckCircle2, Package, Plane, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const rates = [
  { carrier: "DHL", service: "Express Worldwide", eta: "2–3 business days", price: "HK$428" },
  { carrier: "FedEx", service: "International Priority", eta: "3–4 business days", price: "HK$392" },
  { carrier: "UPS", service: "Worldwide Saver", eta: "4–5 business days", price: "HK$348" },
];

export default function NewShipmentPage() {
  const [selectedRate, setSelectedRate] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="page-enter space-y-5">
      <Link href="/dashboard/shipments" className="inline-flex items-center gap-1 text-xs font-bold text-muted hover:text-brand-orange"><ArrowLeft size={14} /> Back to shipments</Link>
      <PageHeader eyebrow="New order" title="Create a shipment" description="Enter shipment details, compare available services, and review before placing your order." />

      <form className="grid gap-5 xl:grid-cols-[1.4fr_.72fr]" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <div className="space-y-5">
          <Card className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-orange-50 font-mono text-xs font-bold text-brand-orange">01</span>
              <div><h2 className="font-extrabold text-navy">Route details</h2><p className="text-xs text-muted">Where is this shipment going?</p></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Ship from" required defaultValue="Hong Kong"><option>Hong Kong</option><option>Singapore</option></SelectField>
              <SelectField label="Destination country" required defaultValue=""><option value="" disabled>Select country</option><option>Singapore</option><option>United Kingdom</option><option>Japan</option><option>Australia</option></SelectField>
              <Field label="Sender company" placeholder="Your company name" required />
              <Field label="Recipient company" placeholder="Recipient company" required />
              <Field label="Recipient contact" placeholder="Full name" required />
              <Field label="Recipient phone" type="tel" placeholder="+65 0000 0000" required />
              <Field label="Street address" placeholder="Building and street" className="sm:col-span-2" required />
              <Field label="City" placeholder="City" required />
              <Field label="Postal code" placeholder="Postal code" required />
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-orange-50 font-mono text-xs font-bold text-brand-orange">02</span>
              <div><h2 className="font-extrabold text-navy">Parcel details</h2><p className="text-xs text-muted">Used to calculate an accurate rate.</p></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-4">
              <Field label="Weight" type="number" min="0.1" step="0.1" placeholder="2.5" required hint="Kilograms" />
              <Field label="Length" type="number" min="1" placeholder="30" required hint="Centimetres" />
              <Field label="Width" type="number" min="1" placeholder="20" required hint="Centimetres" />
              <Field label="Height" type="number" min="1" placeholder="15" required hint="Centimetres" />
              <SelectField label="Contents" className="sm:col-span-2"><option>Merchandise</option><option>Documents</option><option>Sample</option></SelectField>
              <Field label="Declared value (HKD)" type="number" min="0" placeholder="1,000" className="sm:col-span-2" required />
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-orange-50 font-mono text-xs font-bold text-brand-orange">03</span>
              <div><h2 className="font-extrabold text-navy">Choose a service</h2><p className="text-xs text-muted">Rates are estimates for this demo shipment.</p></div>
            </div>
            <div className="grid gap-3">
              {rates.map((rate, index) => (
                <button type="button" key={rate.carrier} onClick={() => setSelectedRate(index)} className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${selectedRate === index ? "border-brand-orange bg-orange-50/60 ring-2 ring-orange-100" : "border-line hover:border-slate-300"}`}>
                  <span className={`grid size-11 place-items-center rounded-xl font-extrabold ${selectedRate === index ? "bg-brand-orange text-white" : "bg-slate-100 text-navy"}`}>{rate.carrier.slice(0, 2)}</span>
                  <span className="flex-1"><span className="block text-sm font-extrabold text-navy">{rate.carrier} · {rate.service}</span><span className="mt-0.5 block text-xs text-muted">{rate.eta}</span></span>
                  <span className="text-right"><span className="block font-mono text-sm font-semibold text-navy">{rate.price}</span>{selectedRate === index && <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-brand-orange"><Check size={12} /> Selected</span>}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card className="sticky top-27 overflow-hidden">
            <div className="route-grid bg-navy p-5 text-white">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-orange-300">Order summary</p>
              <p className="mt-2 text-xl font-extrabold">Ready to ship</p>
              <p className="mt-1 text-xs text-blue-100/70">HKG → Destination</p>
            </div>
            <div className="space-y-4 p-5">
              <div className="flex items-center gap-3"><Package className="text-brand-orange" size={18} /><div><p className="text-xs font-bold">1 parcel</p><p className="text-[10px] text-muted">Dimensions pending</p></div></div>
              <div className="flex items-center gap-3"><Plane className="text-brand-orange" size={18} /><div><p className="text-xs font-bold">{rates[selectedRate].carrier}</p><p className="text-[10px] text-muted">{rates[selectedRate].service}</p></div></div>
              <div className="flex items-center gap-3"><ShieldCheck className="text-brand-orange" size={18} /><div><p className="text-xs font-bold">Basic liability included</p><p className="text-[10px] text-muted">Terms apply</p></div></div>
              <div className="border-t border-line pt-4">
                <div className="flex justify-between text-xs text-muted"><span>Shipping</span><span>{rates[selectedRate].price}</span></div>
                <div className="mt-2 flex justify-between text-xs text-muted"><span>Estimated tax</span><span>HK$0</span></div>
                <div className="mt-4 flex justify-between font-extrabold text-navy"><span>Total</span><span className="font-mono">{rates[selectedRate].price}</span></div>
              </div>
              <Button type="submit" className="w-full">Place shipment order</Button>
              <p className="text-center text-[10px] leading-4 text-muted">Demo only. No payment or shipment will be created.</p>
            </div>
          </Card>
        </div>
      </form>

      {submitted && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="order-confirmation-title">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl">
            <button onClick={() => setSubmitted(false)} className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Close"><X size={18} /></button>
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 size={32} /></div>
            <h2 id="order-confirmation-title" className="mt-5 text-xl font-extrabold text-navy">Shipment submitted</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Demo order <span className="font-mono font-semibold text-navy">ORD-8178</span> has been sent for admin approval.</p>
            <Button className="mt-6 w-full" onClick={() => setSubmitted(false)}>Done</Button>
          </div>
        </div>
      )}
    </div>
  );
}
