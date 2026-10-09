import type { Metadata } from "next";

import { DashboardView } from "@/features/dashboard/components/dashboard-view";
import { getDashboard } from "@/features/dashboard/server/queries";
import { requireUser } from "@/lib/auth-guard";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const [user, d] = await Promise.all([requireUser(), getDashboard()]);
  return <DashboardView name={user.name} d={d} />;
}
