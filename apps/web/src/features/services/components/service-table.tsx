"use client";

import {
  Briefcase,
  Code2,
  Globe,
  Landmark,
  Palette,
  Pencil,
  Settings,
  Trash2,
} from "lucide-react";
import type { Service } from "../types/service.types";

const STATUS_CFG = {
  ativo: { label: "Ativo", dot: "bg-green-500", badge: "bg-green-50 text-green-700" },
  aguardando: { label: "Pendente", dot: "bg-yellow-400", badge: "bg-yellow-50 text-yellow-700" },
  finalizado: { label: "Concluido", dot: "bg-blue-500", badge: "bg-blue-50 text-blue-700" },
} as const;

type IconCfg = { icon: React.ElementType; bg: string; text: string };

function getIconCfg(title: string): IconCfg {
  const t = title.toLowerCase();
  if (/\b(ti|tech|software|sistema|digital|dados|dev)\b/.test(t))
    return { icon: Code2, bg: "bg-violet-100", text: "text-violet-600" };
  if (/\b(audit|financ|contab|fiscal|conta)\b/.test(t))
    return { icon: Landmark, bg: "bg-blue-100", text: "text-blue-600" };
  if (/\b(web|site|portal|app|ux|ui|interface)\b/.test(t))
    return { icon: Globe, bg: "bg-emerald-100", text: "text-emerald-600" };
  if (/\b(suporte|manut|infra|rede|servidor)\b/.test(t))
    return { icon: Settings, bg: "bg-orange-100", text: "text-orange-600" };
  if (/\b(brand|market|identidade|design|logo|criativ)\b/.test(t))
    return { icon: Palette, bg: "bg-pink-100", text: "text-pink-600" };
  return { icon: Briefcase, bg: "bg-indigo-100", text: "text-indigo-600" };
}

function fmt(date?: string) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface Props {
  services: Service[];
  clientName: (id: string) => string;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

export function ServiceTable({ services, clientName, onEdit, onDelete }: Props) {
  if (services.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-base">Nenhum servico cadastrado ainda.</p>
        <p className="text-sm mt-1">Clique em &quot;+ Novo Servico&quot; para adicionar.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs text-gray-400 uppercase tracking-wide">
            <th className="pb-3 font-medium">Nome do Servico</th>
            <th className="pb-3 font-medium">Cliente</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">
              <span className="block leading-tight">Data de</span>
              <span className="block leading-tight">Inicio</span>
            </th>
            <th className="pb-3 font-medium">
              <span className="block leading-tight">Data de</span>
              <span className="block leading-tight">Termino</span>
            </th>
            <th className="pb-3 font-medium w-16 text-right">Acoes</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => {
            const cfg = STATUS_CFG[s.status] ?? STATUS_CFG.aguardando;
            const { icon: Icon, bg, text } = getIconCfg(s.title);

            return (
              <tr
                key={s.id}
                className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${bg} ${text} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 leading-snug">{s.title}</p>
                      {s.description && (
                        <p className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">{s.description}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 text-gray-600">{clientName(s.client_id)}</td>
                <td className="py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                </td>
                <td className="py-4 text-gray-600">{fmt(s.start_date)}</td>
                <td className="py-4 text-gray-600">{fmt(s.end_date)}</td>
                <td className="py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(s)}
                      title="Editar"
                      className="p-1.5 rounded-md text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(s.id)}
                      title="Excluir"
                      className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}