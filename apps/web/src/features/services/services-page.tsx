"use client";

import { useClients } from "@/features/clients/hooks/use-clients";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useState } from "react";
import { ServiceFormModal } from "./components/service-form-modal";
import { ServiceTable } from "./components/service-table";
import { useCreateService } from "./hooks/use-create-service";
import { useDeleteService } from "./hooks/use-delete-service";
import { useServices } from "./hooks/use-services";
import { useUpdateService } from "./hooks/use-update-service";
import type { CreateServiceInput, Service, ServiceStatus } from "./types/service.types";

type FilterKey = "all" | ServiceStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "ativo", label: "Ativos" },
  { key: "aguardando", label: "Pendentes" },
  { key: "finalizado", label: "Concluidos" },
];

const PER_PAGE = 8;

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [page, setPage] = useState(1);

  const { data: services = [], isLoading } = useServices();
  const { data: clients = [] } = useClients();
  const createService = useCreateService();
  const updateService = useUpdateService(editing?.id ?? "");
  const deleteService = useDeleteService();

  function clientName(id: string) {
    return clients.find((c) => c.id === id)?.name ?? "-";
  }

  const filtered =
    activeFilter === "all"
      ? services
      : services.filter((s) => s.status === activeFilter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(service: Service) {
    setEditing(service);
    setModalOpen(true);
  }

  function handleSubmit(data: CreateServiceInput) {
    if (editing) {
      updateService.mutate(data, { onSuccess: () => setModalOpen(false) });
    } else {
      createService.mutate(data, { onSuccess: () => setModalOpen(false) });
    }
  }

  function handleDelete(id: string) {
    if (confirm("Deseja excluir este servico?")) deleteService.mutate(id);
  }

  function handleFilter(key: FilterKey) {
    setActiveFilter(key);
    setPage(1);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Servicos Ativos</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Gerencie e acompanhe todos os processos em andamento.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
        >
          + Novo Servico
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-6">
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-3.5 h-3.5" />
            Filtros
          </button>
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => handleFilter(f.key)}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  activeFilter === f.key
                    ? "bg-primary-500 text-white font-medium"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="text-center py-16 text-gray-400">Carregando...</div>
        ) : (
          <ServiceTable
            services={paginated}
            clientName={clientName}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}

        {/* Pagination */}
        {!isLoading && filtered.length > 0 && (
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Mostrando {paginated.length} de {filtered.length} servico
              {filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-7 h-7 text-xs rounded-md transition-colors ${
                    currentPage === n
                      ? "bg-primary-500 text-white font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <ServiceFormModal
        open={modalOpen}
        editing={editing}
        clients={clients}
        loading={createService.isPending || updateService.isPending}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}