"use client";

import { useClients } from "@/features/clients/hooks/use-clients";
import { useState } from "react";
import { ServiceFormModal } from "./components/service-form-modal";
import { ServiceTable } from "./components/service-table";
import { useCreateService } from "./hooks/use-create-service";
import { useDeleteService } from "./hooks/use-delete-service";
import { useServices } from "./hooks/use-services";
import { useUpdateService } from "./hooks/use-update-service";
import type { CreateServiceInput, Service } from "./types/service.types";

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);

  const { data: services = [], isLoading } = useServices();
  const { data: clients = [] } = useClients();
  const createService = useCreateService();
  const updateService = useUpdateService(editing?.id ?? "");
  const deleteService = useDeleteService();

  function clientName(id: string) {
    return clients.find((c) => c.id === id)?.name ?? id;
  }

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
    if (confirm("Deseja excluir este serviço?")) deleteService.mutate(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Serviços</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Acompanhe os serviços prestados
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
        >
          + Novo Serviço
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {isLoading ? (
          <div className="text-center py-16 text-gray-400">Carregando...</div>
        ) : (
          <ServiceTable
            services={services}
            clientName={clientName}
            onEdit={openEdit}
            onDelete={handleDelete}
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
