import { LoginExperience } from "@/components/auth/login-experience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your ShipMe customer workspace.",
};

export default function CustomerLoginPage() {
  return <LoginExperience mode="customer" />;
}
