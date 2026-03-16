"use client";

import type { Service } from "../types/service.types";

const STATUS_LABELS: Record<string, string> = {
  ativo: "Ativo",
  aguardando: "Aguardando",
  finalizado: "Finalizado",
};

const STATUS_COLORS: Record<string, string> = {
  ativo: "bg-green-100 text-green-700",
  aguardando: "bg-yellow-100 text-yellow-700",
  finalizado: "bg-gray-100 text-gray-600",
};

function fmt(date?: string) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("pt-BR");
}

interface Props {
  services: Service[];
  clientName: (id: string) => string;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

export function ServiceTable({
  services,
  clientName,
  onEdit,
  onDelete,
}: Props) {
  if (services.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-base">Nenhum serviço cadastrado ainda.</p>
        <p className="text-sm mt-1">Clique em "Novo Serviço" para adicionar.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-gray-500">
            <th className="pb-3 font-medium">Título</th>
            <th className="pb-3 font-medium">Cliente</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Início</th>
            <th className="pb-3 font-medium">Término</th>
            <th className="pb-3 font-medium w-24">Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr
              key={s.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 font-medium text-gray-900">{s.title}</td>
              <td className="py-3 text-gray-600">{clientName(s.client_id)}</td>
              <td className="py-3">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[s.status] ?? ""}`}
                >
                  {STATUS_LABELS[s.status] ?? s.status}
                </span>
              </td>
              <td className="py-3 text-gray-600">{fmt(s.start_date)}</td>
              <td className="py-3 text-gray-600">{fmt(s.end_date)}</td>
              <td className="py-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(s)}
                    className="text-xs text-primary-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(s.id)}
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
