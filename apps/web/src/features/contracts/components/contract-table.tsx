"use client";

import type { Contract } from "../types/contract.types";

function fmtCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function fmtDate(date?: string) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("pt-BR");
}

interface Props {
  contracts: Contract[];
  clientName: (id: string) => string;
  onEdit: (contract: Contract) => void;
  onDelete: (id: string) => void;
}

export function ContractTable({
  contracts,
  clientName,
  onEdit,
  onDelete,
}: Props) {
  if (contracts.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-base">Nenhum contrato cadastrado ainda.</p>
        <p className="text-sm mt-1">
          Clique em "Novo Contrato" para adicionar.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-gray-500">
            <th className="pb-3 font-medium">Cliente</th>
            <th className="pb-3 font-medium">Valor</th>
            <th className="pb-3 font-medium">Parcelas</th>
            <th className="pb-3 font-medium">Início</th>
            <th className="pb-3 font-medium">Vencimento</th>
            <th className="pb-3 font-medium w-24">Ações</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((c) => (
            <tr
              key={c.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 font-medium text-gray-900">
                {clientName(c.client_id)}
              </td>
              <td className="py-3 text-gray-900">{fmtCurrency(c.value)}</td>
              <td className="py-3 text-gray-600">{c.installments ?? "—"}</td>
              <td className="py-3 text-gray-600">{fmtDate(c.start_date)}</td>
              <td className="py-3 text-gray-600">{fmtDate(c.due_date)}</td>
              <td className="py-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(c)}
                    className="text-xs text-primary-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(c.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
