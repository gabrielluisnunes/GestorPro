import { apiClient } from "@/lib/api-client";
import type { DashboardSummary } from "../types/dashboard.types";

export const dashboardService = {
  getSummary: (): Promise<DashboardSummary> =>
    apiClient.get("/dashboard").then((res) => res.data),
};
