"use client";

import { FileCheck } from "lucide-react";
import type { ClientContract } from "../types/client.types";

function fmtCurrency(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface Props {
  contracts: ClientContract[];
}

export function ClientContractsTab({ contracts }: Props) {
  if (contracts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <FileCheck className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p className="text-sm">Nenhum contrato vinculado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {contracts.map((c) => {
        const pago = c.payments?.filter((p) => p.status === "pago").length ?? 0;
        const total = c.payments?.length ?? 0;
        return (
          <div
            key={c.id}
            className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-900">
                {fmtCurrency(Number(c.value))}
              </p>
              {c.installments && (
                <span className="text-xs text-gray-500">
                  {c.installments}x parcelas
                </span>
              )}
            </div>
            {(c.start_date || c.due_date) && (
              <p className="text-xs text-gray-500">
                {c.start_date &&
                  `Inicio: ${new Date(c.start_date).toLocaleDateString("pt-BR")}`}
                {c.due_date &&
                  ` — Vencimento: ${new Date(c.due_date).toLocaleDateString("pt-BR")}`}
              </p>
            )}
            {total > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                Pagamentos: {pago}/{total} recebidos
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
