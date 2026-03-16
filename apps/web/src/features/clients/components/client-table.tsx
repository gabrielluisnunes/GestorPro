"use client";

import { displayCpfCnpj, displayPhone } from "@/lib/masks";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Client } from "../types/client.types";
import { ClientActionMenu } from "./client-action-menu";
import { ClientAvatar } from "./client-avatar";

function fmtCurrency(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface Props {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

export function ClientTable({ clients, onEdit, onDelete }: Props) {
  const router = useRouter();

  if (clients.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-base">Nenhum cliente cadastrado ainda.</p>
        <p className="text-sm mt-1">
          Clique em &quot;+ Novo Cliente&quot; para adicionar.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs text-gray-400 uppercase tracking-wide">
            <th className="pb-3 font-medium pl-1">Nome do Cliente</th>
            <th className="pb-3 font-medium">Telefone</th>
            <th className="pb-3 font-medium">E-mail</th>
            <th className="pb-3 font-medium text-center">Servicos Ativos</th>
            <th className="pb-3 font-medium text-right">Total Faturado</th>
            <th className="pb-3 font-medium w-10"></th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => {
            const activeServices =
              c.services?.filter((s) => s.status === "ativo").length ?? 0;
            const totalBilled =
              c.contracts?.reduce((sum, ct) => sum + Number(ct.value), 0) ?? 0;
            const cpfCnpj = displayCpfCnpj(c.cpf_cnpj);
            const location = [c.city, c.state].filter(Boolean).join(", ");

            return (
              <tr
                key={c.id}
                className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
              >
                <td className="py-3.5 pl-1">
                  <button
                    onClick={() => router.push(`/clientes/${c.id}`)}
                    className="flex items-center gap-3 text-left group"
                  >
                    <ClientAvatar name={c.name} size="sm" />
                    <div>
                      <span className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors block leading-snug">
                        {c.name}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        {cpfCnpj && (
                          <span className="text-xs text-gray-400">
                            {cpfCnpj}
                          </span>
                        )}
                        {cpfCnpj && location && (
                          <span className="text-gray-200 text-xs">·</span>
                        )}
                        {location && (
                          <span className="inline-flex items-center gap-0.5 text-xs text-gray-400">
                            <MapPin className="w-3 h-3" />
                            {location}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </td>
                <td className="py-3.5 text-gray-600">
                  {displayPhone(c.phone) || "-"}
                </td>
                <td className="py-3.5 text-gray-600">{c.email ?? "-"}</td>
                <td className="py-3.5 text-center">
                  {activeServices > 0 ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {activeServices}{" "}
                      {activeServices === 1 ? "Ativo" : "Ativos"}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                      0 Ativos
                    </span>
                  )}
                </td>
                <td className="py-3.5 text-right font-medium text-gray-900">
                  {fmtCurrency(totalBilled)}
                </td>
                <td className="py-3.5">
                  <ClientActionMenu
                    client={c}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
