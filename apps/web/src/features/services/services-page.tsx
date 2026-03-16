"use client";

import { useClients } from "@/features/clients/hooks/use-clients";
import { useState } from "react";
import { ServiceFilterBar, type FilterKey } from "./components/service-filter-bar";
import { ServiceFormModal } from "./components/service-form-modal";
import { ServicePagination } from "./components/service-pagination";
import { ServiceTable } from "./components/service-table";
import { useCreateService } from "./hooks/use-create-service";
import { useDeleteService } from "./hooks/use-delete-service";
import { useServices } from "./hooks/use-services";
import { useUpdateService } from "./hooks/use-update-service";
import type { CreateServiceInput, Service } from "./types/service.types";

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
    activeFilter === "all" ? services : services.filter((s) => s.status === activeFilter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

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
        <ServiceFilterBar active={activeFilter} onChange={handleFilter} />

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

        {!isLoading && (
          <ServicePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={PER_PAGE}
            shownCount={paginated.length}
            onPageChange={setPage}
          />
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