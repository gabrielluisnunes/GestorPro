"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface RevenueDataPoint {
  month: string;
  value: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

function formatYAxis(value: number): string {
  if (value >= 1000) return `R$${(value / 1000).toFixed(0)}k`;
  return `R$${value}`;
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Receita ao Longo do Tempo
        </h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
          Últimos 6 meses
        </span>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={data}
          margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            formatter={(value) => {
              const num = typeof value === "number" ? value : 0;
              return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(num);
            }}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#5B5BD6"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#5B5BD6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
