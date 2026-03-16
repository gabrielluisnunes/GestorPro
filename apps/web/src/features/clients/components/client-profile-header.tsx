"use client";

import { ArrowLeft, Edit2, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Client } from "../types/client.types";
import { ClientAvatar } from "./client-avatar";

function formatClienteSince(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}

function generateClientId(id: string): string {
  return `#${id.slice(0, 8).toUpperCase().replace(/-/g, "")}`;
}

interface Props {
  client: Client;
  onEdit: () => void;
}

export function ClientProfileHeader({ client, onEdit }: Props) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <button
        onClick={() => router.push("/clientes")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Clientes
      </button>

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <ClientAvatar name={client.name} size="lg" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {client.name}
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              {generateClientId(client.id)}
            </p>
            {client.created_at && (
              <p className="text-xs text-gray-500 mt-1">
                Cliente desde {formatClienteSince(client.created_at)}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  client.status === "ativo"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {(client.status ?? "ativo").toUpperCase()}
              </span>
              {client.city && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                  <MapPin className="w-3 h-3" />
                  {client.city}
                  {client.state ? `, ${client.state}` : ""}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 border border-primary-200 hover:bg-primary-50 rounded-lg transition-colors"
        >
          <Edit2 className="w-4 h-4" />
          Editar
        </button>
      </div>
    </div>
  );
}
