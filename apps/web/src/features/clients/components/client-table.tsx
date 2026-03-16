"use client";

import type { Client } from "../types/client.types";

interface Props {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

export function ClientTable({ clients, onEdit, onDelete }: Props) {
  if (clients.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-base">Nenhum cliente cadastrado ainda.</p>
        <p className="text-sm mt-1">Clique em "Novo Cliente" para adicionar.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-gray-500">
            <th className="pb-3 font-medium">Nome</th>
            <th className="pb-3 font-medium">CPF / CNPJ</th>
            <th className="pb-3 font-medium">Email</th>
            <th className="pb-3 font-medium">Telefone</th>
            <th className="pb-3 font-medium w-24">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr
              key={c.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 font-medium text-gray-900">{c.name}</td>
              <td className="py-3 text-gray-600">{c.cpf_cnpj ?? "—"}</td>
              <td className="py-3 text-gray-600">{c.email ?? "—"}</td>
              <td className="py-3 text-gray-600">{c.phone ?? "—"}</td>
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
