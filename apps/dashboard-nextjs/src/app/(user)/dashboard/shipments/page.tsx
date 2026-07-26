import { ShipmentTable } from "@/components/shipment-table";
import { Card, PageHeader } from "@/components/ui/ui-kit";
import { Download, PackagePlus } from "lucide-react";
import Link from "next/link";

export default function ShipmentsPage() {
  return (
    <div className="page-enter space-y-5">
      <PageHeader
        eyebrow="Shipment history"
        title="Your shipments"
        description="Track every delivery, review service details, and find past orders."
        action={
          <div className="flex gap-2">
            <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-white px-4 text-sm font-bold text-navy hover:bg-slate-50"><Download size={16} /> Export</button>
            <Link href="/dashboard/shipments/new" className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-orange px-4 text-sm font-bold text-white hover:bg-brand-orange-dark"><PackagePlus size={16} /> New shipment</Link>
          </div>
        }
      />
      <Card className="overflow-hidden">
        <ShipmentTable />
      </Card>
    </div>
  );
}
