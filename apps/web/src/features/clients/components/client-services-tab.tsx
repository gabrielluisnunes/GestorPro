"use client";

import { Briefcase } from "lucide-react";
import type { ClientService } from "../types/client.types";

const STATUS_LABELS: Record<ClientService["status"], string> = {
  ativo: "Ativo",
  aguardando: "Aguardando",
  finalizado: "Finalizado",
};

const STATUS_COLORS: Record<
  ClientService["status"],
  { bg: string; text: string }
> = {
  ativo: { bg: "bg-green-100", text: "text-green-700" },
  aguardando: { bg: "bg-amber-100", text: "text-amber-700" },
  finalizado: { bg: "bg-gray-100", text: "text-gray-500" },
};

interface Props {
  services: ClientService[];
}

export function ClientServicesTab({ services }: Props) {
  if (services.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p className="text-sm">Nenhum servico vinculado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {services.map((s) => {
        const colors = STATUS_COLORS[s.status] ?? STATUS_COLORS.aguardando;
        return (
          <div
            key={s.id}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{s.title}</p>
                {s.description && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {s.description}
                  </p>
                )}
                {s.start_date && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    Inicio: {new Date(s.start_date).toLocaleDateString("pt-BR")}
                    {s.end_date
                      ? ` — Fim: ${new Date(s.end_date).toLocaleDateString("pt-BR")}`
                      : ""}
                  </p>
                )}
              </div>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
            >
              {STATUS_LABELS[s.status]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
