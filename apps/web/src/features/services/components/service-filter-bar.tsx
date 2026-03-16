"use client";

import { Filter } from "lucide-react";
import type { ServiceStatus } from "../types/service.types";

export type FilterKey = "all" | ServiceStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "ativo", label: "Ativos" },
  { key: "aguardando", label: "Pendentes" },
  { key: "finalizado", label: "Concluídos" },
];

interface Props {
  active: FilterKey;
  onChange: (key: FilterKey) => void;
}

export function ServiceFilterBar({ active, onChange }: Props) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <Filter className="w-3.5 h-3.5" />
        Filtros
      </button>
      <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              active === f.key
                ? "bg-primary-500 text-white font-medium"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
