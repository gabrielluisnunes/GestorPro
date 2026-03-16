"use client";

import type { Client } from "@/features/clients/types/client.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { CreateEventInput, Event } from "../types/event.types";

const schema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  type: z
    .enum(["reuniao", "prazo", "audiencia", "sessao", "tarefa"])
    .default("tarefa"),
  date: z.string().min(1, "Data obrigatória"),
  time: z.string().optional(),
  client_id: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  editing?: Event | null;
  clients: Client[];
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEventInput) => void;
}

const inputCls =
  "mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors";

export function EventFormModal({
  open,
  editing,
  clients,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (open) {
      reset(
        editing
          ? {
              title: editing.title,
              type: editing.type,
              date: editing.date,
              time: editing.time ?? "",
              client_id: editing.client_id ?? "",
              notes: editing.notes ?? "",
            }
          : {
              title: "",
              type: "tarefa",
              date: "",
              time: "",
              client_id: "",
              notes: "",
            },
      );
    }
  }, [open, editing, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          {editing ? "Editar Evento" : "Novo Evento"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Título *
            </label>
            <input {...register("title")} className={inputCls} />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Tipo</label>
            <select {...register("type")} className={inputCls}>
              <option value="tarefa">Tarefa</option>
              <option value="reuniao">Reunião</option>
              <option value="prazo">Prazo</option>
              <option value="audiencia">Audiência</option>
              <option value="sessao">Sessão</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Data *
              </label>
              <input {...register("date")} type="date" className={inputCls} />
              {errors.date && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Hora</label>
              <input {...register("time")} type="time" className={inputCls} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Cliente</label>
            <select {...register("client_id")} className={inputCls}>
              <option value="">Nenhum</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Observações
            </label>
            <textarea
              {...register("notes")}
              rows={2}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg disabled:opacity-60 transition-colors"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
