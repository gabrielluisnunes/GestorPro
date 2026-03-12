import Link from "next/link";
import type { Service } from "../../services/types/service.types";

interface ActiveServicesListProps {
  services: Service[];
}

const statusLabel: Record<string, string> = {
  ativo: "Ativo",
  aguardando: "Aguardando",
  finalizado: "Finalizado",
};

const statusColor: Record<string, string> = {
  ativo: "text-emerald-600 bg-emerald-50",
  aguardando: "text-amber-600 bg-amber-50",
  finalizado: "text-gray-500 bg-gray-100",
};

export function ActiveServicesList({ services }: ActiveServicesListProps) {
  const active = services.filter((s) => s.status === "ativo").slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Serviços Ativos</h3>
        <Link
          href="/servicos"
          className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          Gerenciar
        </Link>
      </div>

      {active.length === 0 ? (
        <p className="text-sm text-gray-400 py-4 text-center">
          Nenhum serviço ativo no momento.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-gray-50">
          {active.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between py-3 gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-primary-500"
                  >
                    <path
                      d="M20 7H4C2.9 7 2 7.9 2 9v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-800 truncate">
                  {service.title}
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                  statusColor[service.status] ?? statusColor.aguardando
                }`}
              >
                {statusLabel[service.status] ?? service.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
