"use client";

import type { Payment } from "../types/payment.types";

const STATUS_LABELS: Record<string, string> = {
  pendente: "Pendente",
  pago: "Pago",
  atrasado: "Atrasado",
};

const STATUS_COLORS: Record<string, string> = {
  pendente: "bg-yellow-100 text-yellow-700",
  pago: "bg-green-100 text-green-700",
  atrasado: "bg-red-100 text-red-600",
};

function fmtCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function fmtDate(date?: string) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("pt-BR");
}

interface Props {
  payments: Payment[];
  onEdit: (payment: Payment) => void;
}

export function PaymentTable({ payments, onEdit }: Props) {
  if (payments.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-base">Nenhum pagamento registrado ainda.</p>
        <p className="text-sm mt-1">
          Clique em "Novo Pagamento" para adicionar.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-gray-500">
            <th className="pb-3 font-medium">Valor</th>
            <th className="pb-3 font-medium">Vencimento</th>
            <th className="pb-3 font-medium">Data Pagamento</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium w-20">Ações</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr
              key={p.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 font-medium text-gray-900">
                {fmtCurrency(p.value)}
              </td>
              <td className="py-3 text-gray-600">{fmtDate(p.due_date)}</td>
              <td className="py-3 text-gray-600">{fmtDate(p.payment_date)}</td>
              <td className="py-3">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[p.status] ?? ""}`}
                >
                  {STATUS_LABELS[p.status] ?? p.status}
                </span>
              </td>
              <td className="py-3">
                <button
                  onClick={() => onEdit(p)}
                  className="text-xs text-primary-600 hover:underline"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
