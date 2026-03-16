"use client";

import { Calendar, DollarSign, FileText, UserPlus } from "lucide-react";
import type { TimelineItem } from "../types/client.types";

const ICON_MAP: Record<
  TimelineItem["type"],
  { icon: React.ElementType; bg: string; text: string }
> = {
  created: { icon: UserPlus, bg: "bg-violet-100", text: "text-violet-600" },
  contract: { icon: FileText, bg: "bg-blue-100", text: "text-blue-600" },
  payment: { icon: DollarSign, bg: "bg-emerald-100", text: "text-emerald-600" },
  event: { icon: Calendar, bg: "bg-amber-100", text: "text-amber-600" },
  document: { icon: FileText, bg: "bg-gray-100", text: "text-gray-600" },
};

function formatRelative(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface Props {
  items: TimelineItem[];
}

export function ClientTimeline({ items }: Props) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-8">
        Sem atividades registradas.
      </p>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-100" />
      <div className="space-y-5">
        {items.map((item, idx) => {
          const cfg = ICON_MAP[item.type] ?? ICON_MAP.event;
          const Icon = cfg.icon;
          return (
            <div key={item.id} className="flex gap-3 relative">
              <div
                className={`w-8 h-8 rounded-full ${cfg.bg} ${cfg.text} flex items-center justify-center shrink-0 z-10`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm font-medium text-gray-800 leading-tight">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                  {item.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatRelative(item.date)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
