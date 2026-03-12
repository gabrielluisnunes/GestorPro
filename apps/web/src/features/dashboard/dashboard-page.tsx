"use client";

import { useServices } from "../services/hooks/use-services";
import { ActiveServicesList } from "./components/active-services-list";
import { KpiCardsRow } from "./components/kpi-cards-row";
import { PaymentStatusChart } from "./components/payment-status-chart";
import type { RevenueDataPoint } from "./components/revenue-chart";
import { RevenueChart } from "./components/revenue-chart";
import { TodayAgenda } from "./components/today-agenda";
import { useDashboard } from "./hooks/use-dashboard";

// Placeholder de gráfico de receita até o backend expor histórico mensal
const REVENUE_PLACEHOLDER: RevenueDataPoint[] = [
  { month: "Jan", value: 0 },
  { month: "Fev", value: 0 },
  { month: "Mar", value: 0 },
  { month: "Abr", value: 0 },
  { month: "Mai", value: 0 },
  { month: "Jun", value: 0 },
];

export default function DashboardPage() {
  const { data: summary, isLoading: loadingDashboard } = useDashboard();
  const { data: services = [], isLoading: loadingServices } = useServices();

  if (loadingDashboard || loadingServices) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-7 h-7 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!summary) return null;

  const paymentStatusData = {
    paid: parseFloat(summary.monthly_revenue),
    pending: parseFloat(summary.pending_payments.total),
    overdue: parseFloat(summary.overdue_payments.total),
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Olá! 👋</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Veja o que está acontecendo com sua plataforma hoje.
        </p>
      </div>

      {/* KPI Cards */}
      <KpiCardsRow data={summary} />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueChart data={REVENUE_PLACEHOLDER} />
        </div>
        <PaymentStatusChart data={paymentStatusData} />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TodayAgenda events={summary.upcoming_events} />
        <ActiveServicesList services={services} />
      </div>
    </div>
  );
}
