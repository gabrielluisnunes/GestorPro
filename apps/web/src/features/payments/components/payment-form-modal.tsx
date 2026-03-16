"use client";

import type { Contract } from "@/features/contracts/types/contract.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { CreatePaymentInput, Payment } from "../types/payment.types";

const schema = z.object({
  contract_id: z.string().min(1, "Contrato obrigatório"),
  value: z.coerce.number().positive("Valor deve ser positivo"),
  due_date: z.string().min(1, "Vencimento obrigatório"),
  payment_date: z.string().optional(),
  status: z.enum(["pendente", "pago", "atrasado"]).default("pendente"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  editing?: Payment | null;
  contracts: Contract[];
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePaymentInput) => void;
}

const inputCls =
  "mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors";

export function PaymentFormModal({
  open,
  editing,
  contracts,
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
              contract_id: editing.contract_id,
              value: editing.value,
              due_date: editing.due_date,
              payment_date: editing.payment_date ?? "",
              status: editing.status,
            }
          : {
              contract_id: "",
              value: undefined,
              due_date: "",
              payment_date: "",
              status: "pendente",
            },
      );
    }
  }, [open, editing, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          {editing ? "Editar Pagamento" : "Novo Pagamento"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Contrato *
            </label>
            <select {...register("contract_id")} className={inputCls}>
              <option value="">Selecione um contrato</option>
              {contracts.map((c) => (
                <option key={c.id} value={c.id}>
                  Contrato #{c.id.slice(0, 8)} — R${" "}
                  {c.value.toLocaleString("pt-BR")}
                </option>
              ))}
            </select>
            {errors.contract_id && (
              <p className="text-xs text-red-500 mt-1">
                {errors.contract_id.message}
              </p>
            )}
          </div>

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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Vencimento *
              </label>
              <input
                {...register("due_date")}
                type="date"
                className={inputCls}
              />
              {errors.due_date && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.due_date.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Data Pagamento
              </label>
              <input
                {...register("payment_date")}
                type="date"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select {...register("status")} className={inputCls}>
              <option value="pendente">Pendente</option>
              <option value="pago">Pago</option>
              <option value="atrasado">Atrasado</option>
            </select>
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
