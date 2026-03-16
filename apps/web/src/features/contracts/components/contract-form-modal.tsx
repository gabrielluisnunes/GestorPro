"use client";

import type { Client } from "@/features/clients/types/client.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Contract, CreateContractInput } from "../types/contract.types";

const schema = z.object({
  client_id: z.string().min(1, "Cliente obrigatório"),
  value: z.coerce.number().positive("Valor deve ser positivo"),
  installments: z.coerce.number().int().min(1).optional(),
  start_date: z.string().optional(),
  due_date: z.string().optional(),
  interest_rate: z.coerce.number().min(0).optional(),
  file_url: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  editing?: Contract | null;
  clients: Client[];
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: CreateContractInput) => void;
}

const inputCls =
  "mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors";

export function ContractFormModal({
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
              client_id: editing.client_id,
              value: editing.value,
              installments: editing.installments,
              start_date: editing.start_date ?? "",
              due_date: editing.due_date ?? "",
              interest_rate: editing.interest_rate,
              file_url: editing.file_url ?? "",
            }
          : {
              client_id: "",
              value: undefined,
              installments: undefined,
              start_date: "",
              due_date: "",
              interest_rate: undefined,
              file_url: "",
            },
      );
    }
  }, [open, editing, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          {editing ? "Editar Contrato" : "Novo Contrato"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Valor (R$) *
              </label>
              <input
                {...register("value")}
                type="number"
                step="0.01"
                min="0"
                className={inputCls}
              />
              {errors.value && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.value.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Parcelas
              </label>
              <input
                {...register("installments")}
                type="number"
                min="1"
                className={inputCls}
              />
            </div>
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
                Vencimento
              </label>
              <input
                {...register("due_date")}
                type="date"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Taxa de juros (%)
            </label>
            <input
              {...register("interest_rate")}
              type="number"
              step="0.01"
              min="0"
              className={inputCls}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              URL do arquivo
            </label>
            <input {...register("file_url")} className={inputCls} />
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
