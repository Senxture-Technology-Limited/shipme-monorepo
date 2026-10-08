"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { usePathname } from "next/navigation";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return children;
  }

  return <DashboardShell mode="admin">{children}</DashboardShell>;
}
