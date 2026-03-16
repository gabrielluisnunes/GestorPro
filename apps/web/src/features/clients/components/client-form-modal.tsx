"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Client, CreateClientInput } from "../types/client.types";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  cpf_cnpj: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  address: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  editing?: Client | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: CreateClientInput) => void;
}

const inputCls =
  "mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors";

export function ClientFormModal({
  open,
  editing,
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
              name: editing.name,
              cpf_cnpj: editing.cpf_cnpj ?? "",
              phone: editing.phone ?? "",
              email: editing.email ?? "",
              address: editing.address ?? "",
              notes: editing.notes ?? "",
            }
          : {
              name: "",
              cpf_cnpj: "",
              phone: "",
              email: "",
              address: "",
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
          {editing ? "Editar Cliente" : "Novo Cliente"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Nome *</label>
            <input {...register("name")} className={inputCls} />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                CPF / CNPJ
              </label>
              <input {...register("cpf_cnpj")} className={inputCls} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input {...register("phone")} className={inputCls} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input {...register("email")} type="email" className={inputCls} />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Endereço
            </label>
            <input {...register("address")} className={inputCls} />
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
