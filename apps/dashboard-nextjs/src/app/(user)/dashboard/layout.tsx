import { DashboardShell } from "@/components/dashboard-shell";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell mode="user">{children}</DashboardShell>;
}
