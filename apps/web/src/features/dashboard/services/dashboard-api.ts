import { apiClient } from "@/lib/api-client";
import type { DashboardSummary } from "../types/dashboard.types";

export async function getDashboardSummary(): Promise<DashboardSummary> {
  return apiClient.get("/dashboard").then((res) => res.data);
}
