"use client";

import { Briefcase, DollarSign, FileCheck, FileText } from "lucide-react";
import type { Client } from "../types/client.types";

function fmtCurrency(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface Props {
  client: Client;
}

export function ClientKpiCards({ client }: Props) {
  const totalInvested =
    client.contracts?.reduce((sum, c) => sum + Number(c.value), 0) ?? 0;
  const activeServices =
    client.services?.filter((s) => s.status === "ativo").length ?? 0;
  const totalDocuments = client.documents?.length ?? 0;
  const totalContracts = client.contracts?.length ?? 0;

  const cards = [
    {
      label: "Total Investido",
      value: fmtCurrency(totalInvested),
      icon: DollarSign,
      bg: "bg-violet-100",
      text: "text-violet-600",
    },
    {
      label: "Servicos Ativos",
      value: String(activeServices),
      icon: Briefcase,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      label: "Documentos",
      value: String(totalDocuments),
      icon: FileText,
      bg: "bg-amber-100",
      text: "text-amber-600",
    },
    {
      label: "Contratos Firmados",
      value: String(totalContracts),
      icon: FileCheck,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-100 p-5"
          >
            <div
              className={`w-10 h-10 rounded-lg ${card.bg} ${card.text} flex items-center justify-center mb-3`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
}
