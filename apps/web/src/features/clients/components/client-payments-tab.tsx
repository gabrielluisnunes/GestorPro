"use client";

import { DollarSign } from "lucide-react";
import type { ClientPayment } from "../types/client.types";

function fmtCurrency(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const STATUS_CONFIG: Record<
  ClientPayment["status"],
  { label: string; bg: string; text: string }
> = {
  pago: { label: "Pago", bg: "bg-green-100", text: "text-green-700" },
  pendente: { label: "Pendente", bg: "bg-amber-100", text: "text-amber-700" },
  atrasado: { label: "Atrasado", bg: "bg-red-100", text: "text-red-600" },
};

interface Props {
  payments: ClientPayment[];
}

export function ClientPaymentsTab({ payments }: Props) {
  if (payments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <DollarSign className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p className="text-sm">Nenhum pagamento registrado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {payments.map((p) => {
        const cfg = STATUS_CONFIG[p.status] ?? STATUS_CONFIG.pendente;
        return (
          <div
            key={p.id}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {fmtCurrency(Number(p.value))}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Vencimento: {new Date(p.due_date).toLocaleDateString("pt-BR")}
                {p.payment_date &&
                  ` — Pago em: ${new Date(p.payment_date).toLocaleDateString("pt-BR")}`}
              </p>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}
            >
              {cfg.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
