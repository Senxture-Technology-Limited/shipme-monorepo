import { DashboardShell } from "@/components/dashboard-shell";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell mode="admin">{children}</DashboardShell>;
}
