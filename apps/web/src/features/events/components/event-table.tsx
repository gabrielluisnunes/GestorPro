"use client";

import type { Event } from "../types/event.types";

const TYPE_LABELS: Record<string, string> = {
  reuniao: "Reunião",
  prazo: "Prazo",
  audiencia: "Audiência",
  sessao: "Sessão",
  tarefa: "Tarefa",
};

const TYPE_COLORS: Record<string, string> = {
  reuniao: "bg-blue-100 text-blue-700",
  prazo: "bg-red-100 text-red-600",
  audiencia: "bg-purple-100 text-purple-700",
  sessao: "bg-indigo-100 text-indigo-700",
  tarefa: "bg-gray-100 text-gray-600",
};

function fmtDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR");
}

interface Props {
  events: Event[];
  clientName: (id?: string) => string;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

export function EventTable({ events, clientName, onEdit, onDelete }: Props) {
  if (events.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-base">Nenhum evento na agenda.</p>
        <p className="text-sm mt-1">Clique em "Novo Evento" para adicionar.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-gray-500">
            <th className="pb-3 font-medium">Título</th>
            <th className="pb-3 font-medium">Tipo</th>
            <th className="pb-3 font-medium">Data</th>
            <th className="pb-3 font-medium">Hora</th>
            <th className="pb-3 font-medium">Cliente</th>
            <th className="pb-3 font-medium w-24">Ações</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr
              key={e.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 font-medium text-gray-900">{e.title}</td>
              <td className="py-3">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_COLORS[e.type] ?? ""}`}
                >
                  {TYPE_LABELS[e.type] ?? e.type}
                </span>
              </td>
              <td className="py-3 text-gray-600">{fmtDate(e.date)}</td>
              <td className="py-3 text-gray-600">{e.time ?? "—"}</td>
              <td className="py-3 text-gray-600">{clientName(e.client_id)}</td>
              <td className="py-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(e)}
                    className="text-xs text-primary-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(e.id)}
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
