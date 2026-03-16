"use client";

import { useClients } from "@/features/clients/hooks/use-clients";
import { useState } from "react";
import { EventFormModal } from "./components/event-form-modal";
import { EventTable } from "./components/event-table";
import { useCreateEvent } from "./hooks/use-create-event";
import { useDeleteEvent } from "./hooks/use-delete-event";
import { useEvents } from "./hooks/use-events";
import { useUpdateEvent } from "./hooks/use-update-event";
import type { CreateEventInput, Event } from "./types/event.types";

export default function EventsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);

  const { data: events = [], isLoading } = useEvents();
  const { data: clients = [] } = useClients();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent(editing?.id ?? "");
  const deleteEvent = useDeleteEvent();

  function clientName(id?: string) {
    if (!id) return "—";
    return clients.find((c) => c.id === id)?.name ?? "—";
  }

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(event: Event) {
    setEditing(event);
    setModalOpen(true);
  }

  function handleSubmit(data: CreateEventInput) {
    if (editing) {
      updateEvent.mutate(data, { onSuccess: () => setModalOpen(false) });
    } else {
      createEvent.mutate(data, { onSuccess: () => setModalOpen(false) });
    }
  }

  function handleDelete(id: string) {
    if (confirm("Deseja excluir este evento?")) deleteEvent.mutate(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Agenda</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Compromissos, prazos e eventos
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
        >
          + Novo Evento
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {isLoading ? (
          <div className="text-center py-16 text-gray-400">Carregando...</div>
        ) : (
          <EventTable
            events={events}
            clientName={clientName}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <EventFormModal
        open={modalOpen}
        editing={editing}
        clients={clients}
        loading={createEvent.isPending || updateEvent.isPending}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
