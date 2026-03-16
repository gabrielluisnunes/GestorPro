"use client";

import type { Client } from "@/features/clients/types/client.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { serviceSchema, type ServiceFormData } from "../schemas/service-schema";
import type { CreateServiceInput, Service } from "../types/service.types";
import { ServiceFormFields } from "./service-form-fields";

interface Props {
  open: boolean;
  editing?: Service | null;
  clients: Client[];
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: CreateServiceInput) => void;
}

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
  } = useForm<ServiceFormData>({ resolver: zodResolver(serviceSchema) });

  useEffect(() => {
    if (!open) return;
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
  }, [open, editing, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          {editing ? "Editar Servico" : "Novo Servico"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ServiceFormFields register={register} errors={errors} clients={clients} />

          <div className="flex justify-end gap-3 pt-4">
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