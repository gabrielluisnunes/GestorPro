"use client";

import type { Client } from "@/features/clients/types/client.types";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ServiceFormData } from "../schemas/service-schema";

const inputCls =
  "mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors";

const textareaCls =
  "mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none";

interface Props {
  register: UseFormRegister<ServiceFormData>;
  errors: FieldErrors<ServiceFormData>;
  clients: Client[];
}

export function ServiceFormFields({ register, errors, clients }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Título *</label>
        <input {...register("title")} className={inputCls} />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Cliente *</label>
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
          <input {...register("start_date")} type="date" className={inputCls} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Data término
          </label>
          <input {...register("end_date")} type="date" className={inputCls} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          {...register("description")}
          rows={2}
          className={textareaCls}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Observações</label>
        <textarea {...register("notes")} rows={2} className={textareaCls} />
      </div>
    </div>
  );
}
