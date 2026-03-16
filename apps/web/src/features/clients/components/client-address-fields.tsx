"use client";

import { maskCEP } from "@/lib/masks";
import type { Control, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { ClientFormData } from "../schemas/client-schema";

const inputCls =
  "mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors";

interface Props {
  register: UseFormRegister<ClientFormData>;
  control: Control<ClientFormData>;
  cepLoading: boolean;
  onCepBlur: (cep: string) => void;
}

export function ClientAddressFields({
  register,
  control,
  cepLoading,
  onCepBlur,
}: Props) {
  return (
    <section className="space-y-3">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
        Endereco
      </p>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700">
            CEP
            {cepLoading && (
              <span className="text-xs text-gray-400 font-normal ml-1">
                buscando...
              </span>
            )}
          </label>
          <Controller
            name="cep"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                value={field.value ? maskCEP(field.value) : ""}
                onChange={(e) => field.onChange(maskCEP(e.target.value))}
                onBlur={(e) => {
                  field.onBlur();
                  onCepBlur(e.target.value);
                }}
                className={inputCls}
                placeholder="00000-000"
              />
            )}
          />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Logradouro
          </label>
          <input
            {...register("street")}
            className={inputCls}
            placeholder="Rua, Av..."
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700">Numero</label>
          <input
            {...register("number")}
            className={inputCls}
            placeholder="123"
          />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Complemento
          </label>
          <input
            {...register("complement")}
            className={inputCls}
            placeholder="Apto, Sala..."
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-700">Bairro</label>
          <input {...register("neighborhood")} className={inputCls} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">UF</label>
          <input
            {...register("state")}
            className={inputCls}
            maxLength={2}
            placeholder="SP"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Cidade</label>
        <input {...register("city")} className={inputCls} />
      </div>
    </section>
  );
}
