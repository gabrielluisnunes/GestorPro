"use client";

import type { Client } from "@/features/clients/types/client.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { CreateServiceInput, Service } from "../types/service.types";

const schema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  client_id: z.string().min(1, "Cliente obrigatório"),
  description: z.string().optional(),
  status: z.enum(["ativo", "aguardando", "finalizado"]).default("aguardando"),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  editing?: Service | null;
  clients: Client[];
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: CreateServiceInput) => void;
}

const inputCls =
  "mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors";

export function ServiceFormModal({
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
              client_id: editing.client_id,
              description: editing.description ?? "",
              status: editing.status,
              start_date: editing.start_date ?? "",
              end_date: editing.end_date ?? "",
              notes: editing.notes ?? "",
            }
          : {
              title: "",
              client_id: "",
              description: "",
              status: "aguardando",
              start_date: "",
              end_date: "",
              notes: "",
            },
      );
    }
  }, [open, editing, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          {editing ? "Editar Serviço" : "Novo Serviço"}
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
            <label className="text-sm font-medium text-gray-700">
              Cliente *
            </label>
            <select {...register("client_id")} className={inputCls}>
              <option value="">Selecione um cliente</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.client_id && (
              <p className="text-xs text-red-500 mt-1">
                {errors.client_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select {...register("status")} className={inputCls}>
              <option value="aguardando">Aguardando</option>
              <option value="ativo">Ativo</option>
              <option value="finalizado">Finalizado</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Data início
              </label>
              <input
                {...register("start_date")}
                type="date"
                className={inputCls}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Data término
              </label>
              <input
                {...register("end_date")}
                type="date"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              {...register("description")}
              rows={2}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
            />
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
