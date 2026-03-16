"use client";

import { useClients } from "@/features/clients/hooks/use-clients";
import { useState } from "react";
import { ContractFormModal } from "./components/contract-form-modal";
import { ContractTable } from "./components/contract-table";
import { useContracts } from "./hooks/use-contracts";
import { useCreateContract } from "./hooks/use-create-contract";
import { useDeleteContract } from "./hooks/use-delete-contract";
import { useUpdateContract } from "./hooks/use-update-contract";
import type { Contract, CreateContractInput } from "./types/contract.types";

export default function ContractsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Contract | null>(null);

  const { data: contracts = [], isLoading } = useContracts();
  const { data: clients = [] } = useClients();
  const createContract = useCreateContract();
  const updateContract = useUpdateContract(editing?.id ?? "");
  const deleteContract = useDeleteContract();

  function clientName(id: string) {
    return clients.find((c) => c.id === id)?.name ?? id;
  }

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(contract: Contract) {
    setEditing(contract);
    setModalOpen(true);
  }

  function handleSubmit(data: CreateContractInput) {
    if (editing) {
      updateContract.mutate(data, { onSuccess: () => setModalOpen(false) });
    } else {
      createContract.mutate(data, { onSuccess: () => setModalOpen(false) });
    }
  }

  function handleDelete(id: string) {
    if (confirm("Deseja excluir este contrato?")) deleteContract.mutate(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Contratos</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Gerencie os contratos com seus clientes
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
        >
          + Novo Contrato
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {isLoading ? (
          <div className="text-center py-16 text-gray-400">Carregando...</div>
        ) : (
          <ContractTable
            contracts={contracts}
            clientName={clientName}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ContractFormModal
        open={modalOpen}
        editing={editing}
        clients={clients}
        loading={createContract.isPending || updateContract.isPending}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
