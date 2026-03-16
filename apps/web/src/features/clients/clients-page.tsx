"use client";

import { useState } from "react";
import { ClientFormModal } from "./components/client-form-modal";
import { ClientTable } from "./components/client-table";
import { useClients } from "./hooks/use-clients";
import { useCreateClient } from "./hooks/use-create-client";
import { useDeleteClient } from "./hooks/use-delete-client";
import { useUpdateClient } from "./hooks/use-update-client";
import type { Client, CreateClientInput } from "./types/client.types";

export default function ClientsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);

  const { data: clients = [], isLoading } = useClients();
  const createClient = useCreateClient();
  const updateClient = useUpdateClient(editing?.id ?? "");
  const deleteClient = useDeleteClient();

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(client: Client) {
    setEditing(client);
    setModalOpen(true);
  }

  function handleSubmit(data: CreateClientInput) {
    if (editing) {
      updateClient.mutate(data, { onSuccess: () => setModalOpen(false) });
    } else {
      createClient.mutate(data, { onSuccess: () => setModalOpen(false) });
    }
  }

  function handleDelete(id: string) {
    if (confirm("Deseja excluir este cliente?")) deleteClient.mutate(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Clientes</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Gerencie sua base de clientes
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
        >
          + Novo Cliente
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {isLoading ? (
          <div className="text-center py-16 text-gray-400">Carregando...</div>
        ) : (
          <ClientTable
            clients={clients}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ClientFormModal
        open={modalOpen}
        editing={editing}
        loading={createClient.isPending || updateClient.isPending}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
