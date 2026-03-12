import Link from "next/link";
import type { UpcomingEvent } from "../types/dashboard.types";

interface TodayAgendaProps {
  events: UpcomingEvent[];
}

function formatTime(time?: string): { hour: string; period: string } {
  if (!time) return { hour: "--:--", period: "" };
  const [hourStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  return {
    hour: time.substring(0, 5),
    period: hour < 12 ? "MANHÃ" : hour < 18 ? "TARDE" : "NOITE",
  };
}

function isToday(dateStr: string): boolean {
  const today = new Date().toISOString().split("T")[0];
  return dateStr.split("T")[0] === today;
}

export function TodayAgenda({ events }: TodayAgendaProps) {
  const todayEvents = events.filter((e) => isToday(e.date));

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Agenda de Hoje</h3>
        <Link
          href="/agenda"
          className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          Ver tudo
        </Link>
      </div>

      {todayEvents.length === 0 ? (
        <p className="text-sm text-gray-400 py-4 text-center">
          Nenhum evento hoje.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-gray-50">
          {todayEvents.map((event) => {
            const { hour, period } = formatTime(event.time);
            return (
              <div key={event.id} className="flex items-center gap-4 py-3">
                <div className="text-right w-12 shrink-0">
                  <p className="text-sm font-semibold text-gray-800">{hour}</p>
                  <p className="text-[10px] text-gray-400 font-medium">
                    {period}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {event.title}
                  </p>
                  {event.type && (
                    <p className="text-xs text-gray-400 capitalize">
                      {event.type}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
