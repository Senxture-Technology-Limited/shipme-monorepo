import { LoginExperience } from "@/components/auth/login-experience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin sign in",
  description: "Authenticate to the ShipMe operations control system.",
};

export default function AdminLoginPage() {
  return <LoginExperience mode="admin" />;
}
