"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { ClientFormModal } from "./components/client-form-modal";
import { ClientTable } from "./components/client-table";
import { useClients } from "./hooks/use-clients";
import { useCreateClient } from "./hooks/use-create-client";
import { useDeleteClient } from "./hooks/use-delete-client";
import { useUpdateClient } from "./hooks/use-update-client";
import type { Client, CreateClientInput } from "./types/client.types";

const PER_PAGE = 10;

export default function ClientsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "ativo" | "inativo">("all");
  const [page, setPage] = useState(1);
  const [serverError, setServerError] = useState<string | null>(null);

  const { data: clients = [], isLoading } = useClients();
  const createClient = useCreateClient();
  const updateClient = useUpdateClient(editing?.id ?? "");
  const deleteClient = useDeleteClient();

  const filtered = clients.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(s) ||
      c.email?.toLowerCase().includes(s) ||
      c.phone?.includes(s) ||
      c.cpf_cnpj?.includes(s)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  function openCreate() {
    setEditing(null);
    setServerError(null);
    setModalOpen(true);
  }

  function openEdit(client: Client) {
    setEditing(client);
    setServerError(null);
    setModalOpen(true);
  }

  function handleSubmit(data: CreateClientInput) {
    setServerError(null);
    const onError = (err: unknown) => {
      const msg = (
        err as { response?: { data?: { message?: string } } }
      )?.response?.data?.message;
      setServerError(typeof msg === "string" ? msg : "Erro ao salvar cliente.");
    };
    if (editing) {
      updateClient.mutate(data, { onSuccess: () => setModalOpen(false), onError });
    } else {
      createClient.mutate(data, { onSuccess: () => setModalOpen(false), onError });
    }
  }

  function handleDelete(id: string) {
    if (confirm("Deseja excluir este cliente?")) deleteClient.mutate(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Gestao de Clientes
          </h1>
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
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar clientes..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
            {(["all", "ativo", "inativo"] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatusFilter(s);
                  setPage(1);
                }}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  statusFilter === s
                    ? "bg-primary-500 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {s === "all" ? "Todos" : s === "ativo" ? "Ativos" : "Inativos"}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-16 text-gray-400">Carregando...</div>
        ) : (
          <ClientTable
            clients={paginated}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}

        {!isLoading && filtered.length > 0 && (
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Mostrando {paginated.length} de {filtered.length} cliente
              {filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-700 px-2">
                {currentPage} / {totalPages}
              </span>
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

      <ClientFormModal
        open={modalOpen}
        editing={editing}
        loading={createClient.isPending || updateClient.isPending}
        serverError={serverError}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}