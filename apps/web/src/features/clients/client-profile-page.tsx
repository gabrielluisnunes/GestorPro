"use client";

import { useState } from "react";
import { ClientContractsTab } from "./components/client-contracts-tab";
import { ClientDocumentsTab } from "./components/client-documents-tab";
import { ClientFormModal } from "./components/client-form-modal";
import { ClientKpiCards } from "./components/client-kpi-cards";
import { ClientPaymentsTab } from "./components/client-payments-tab";
import { ClientProfileHeader } from "./components/client-profile-header";
import { ClientServicesTab } from "./components/client-services-tab";
import { ClientTabs, type ProfileTab } from "./components/client-tabs";
import { ClientTimeline } from "./components/client-timeline";
import { useClientProfile } from "./hooks/use-client-profile";
import { useUpdateClient } from "./hooks/use-update-client";
import type { CreateClientInput } from "./types/client.types";
import { buildClientTimeline } from "./utils/client-timeline";

interface Props {
  id: string;
}

export default function ClientProfilePage({ id }: Props) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("servicos");
  const [editOpen, setEditOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { data: client, isLoading, error } = useClientProfile(id);
  const updateClient = useUpdateClient(id);

  function handleEditSubmit(data: CreateClientInput) {
    setServerError(null);
    updateClient.mutate(data, {
      onSuccess: () => setEditOpen(false),
      onError: (err: unknown) => {
        const msg = (err as { response?: { data?: { message?: string } } })
          ?.response?.data?.message;
        setServerError(typeof msg === "string" ? msg : "Erro ao salvar.");
      },
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-400 text-sm">
        Carregando perfil...
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-400 text-sm">
        Cliente nao encontrado.
      </div>
    );
  }

  const timeline = buildClientTimeline(client);

  const allPayments = (client.contracts ?? []).flatMap((c) => c.payments ?? []);

  return (
    <div className="space-y-5">
      <ClientProfileHeader
        client={client}
        onEdit={() => {
          setServerError(null);
          setEditOpen(true);
        }}
      />

      <ClientKpiCards client={client} />

      <div className="flex gap-5 items-start">
        {/* Main content */}
        <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-100">
          <div className="px-5 pt-4">
            <ClientTabs active={activeTab} onChange={setActiveTab} />
          </div>
          <div className="p-5">
            {activeTab === "servicos" && (
              <ClientServicesTab services={client.services ?? []} />
            )}
            {activeTab === "documentos" && (
              <ClientDocumentsTab documents={client.documents ?? []} />
            )}
            {activeTab === "contratos" && (
              <ClientContractsTab contracts={client.contracts ?? []} />
            )}
            {activeTab === "pagamentos" && (
              <ClientPaymentsTab payments={allPayments} />
            )}
            {activeTab === "notas" && (
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {client.notes ? (
                  client.notes
                ) : (
                  <p className="text-gray-400 italic">
                    Nenhuma observacao registrada.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Timeline sidebar */}
        <aside className="w-72 shrink-0 bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Linha do Tempo
          </h3>
          <ClientTimeline items={timeline} />
        </aside>
      </div>

      <ClientFormModal
        open={editOpen}
        editing={client}
        loading={updateClient.isPending}
        serverError={serverError}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
}
