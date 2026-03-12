import { AlertCircle, Clock, DollarSign, Users } from "lucide-react";
import type { DashboardSummary } from "../types/dashboard.types";
import { KpiCard } from "./kpi-card";

function formatBRL(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(num);
}

interface KpiCardsRowProps {
  data: DashboardSummary;
}

export function KpiCardsRow({ data }: KpiCardsRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <KpiCard
        title="Receita Mensal"
        value={formatBRL(data.monthly_revenue)}
        icon={<DollarSign size={20} />}
        iconBg="bg-emerald-100"
        iconColor="text-emerald-600"
      />
      <KpiCard
        title="Clientes Ativos"
        value={String(data.total_clients)}
        icon={<Users size={20} />}
        iconBg="bg-indigo-100"
        iconColor="text-indigo-600"
      />
      <KpiCard
        title="Pagamentos Pendentes"
        value={formatBRL(data.pending_payments.total)}
        icon={<Clock size={20} />}
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
        badge={
          data.pending_payments.count > 0
            ? {
                label: `${data.pending_payments.count} pendentes`,
                variant: "warning",
              }
            : undefined
        }
      />
      <KpiCard
        title="Pagamentos Atrasados"
        value={`${data.overdue_payments.count} faturas`}
        icon={<AlertCircle size={20} />}
        iconBg="bg-red-100"
        iconColor="text-red-500"
        badge={
          data.overdue_payments.count > 0
            ? {
                label: formatBRL(data.overdue_payments.total),
                variant: "negative",
              }
            : undefined
        }
      />
    </div>
  );
}
