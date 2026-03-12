"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface PaymentStatusData {
  paid: number;
  pending: number;
  overdue: number;
}

interface PaymentStatusChartProps {
  data: PaymentStatusData;
}

const COLORS = ["#5B5BD6", "#F59E0B", "#EF4444"];

function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function PaymentStatusChart({ data }: PaymentStatusChartProps) {
  const total = data.paid + data.pending + data.overdue;
  const efficiency = total > 0 ? Math.round((data.paid / total) * 100) : 0;

  const chartData = [
    { name: "Pagos", value: data.paid },
    { name: "Pendentes", value: data.pending },
    { name: "Atrasados", value: data.overdue },
  ];

  const legend = [
    { label: "Pagos", color: COLORS[0], value: data.paid },
    { label: "Pendentes", color: COLORS[1], value: data.pending },
    { label: "Atrasados", color: COLORS[2], value: data.overdue },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-gray-900">
        Status de Pagamento
      </h3>

      <div className="flex flex-col items-center gap-4">
        {/* Donut chart */}
        <div className="relative w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={68}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-gray-900">
              {efficiency}%
            </span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
              EFICIÊNCIA
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full flex flex-col gap-2">
          {legend.map(({ label, color, value }) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-gray-600">{label}</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">
                {formatBRL(value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
