"use client";

import { maskCpfCnpj, maskPhone } from "@/lib/masks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCepLookup } from "../hooks/use-cep-lookup";
import { clientSchema, type ClientFormData } from "../schemas/client-schema";
import type { Client, CreateClientInput } from "../types/client.types";
import { ClientAddressFields } from "./client-address-fields";

interface Props {
  open: boolean;
  editing?: Client | null;
  loading?: boolean;
  serverError?: string | null;
  onClose: () => void;
  onSubmit: (data: CreateClientInput) => void;
}

const inputCls =
  "mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors";

export function ClientFormModal({
  open,
  editing,
  loading,
  serverError,
  onClose,
  onSubmit,
}: Props) {
  const { loading: cepLoading, lookup: lookupCep } = useCepLookup();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<ClientFormData>({ resolver: zodResolver(clientSchema) });

  useEffect(() => {
    if (!open) return;
    reset(
      editing
        ? {
            name: editing.name,
            cpf_cnpj: editing.cpf_cnpj ?? "",
            phone: editing.phone ?? "",
            email: editing.email ?? "",
            status: editing.status ?? "ativo",
            cep: editing.cep ?? "",
            street: editing.street ?? "",
            number: editing.number ?? "",
            complement: editing.complement ?? "",
            neighborhood: editing.neighborhood ?? "",
            city: editing.city ?? "",
            state: editing.state ?? "",
            notes: editing.notes ?? "",
          }
        : {
            name: "",
            cpf_cnpj: "",
            phone: "",
            email: "",
            status: "ativo",
            cep: "",
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            city: "",
            state: "",
            notes: "",
          },
    );
  }, [open, editing, reset]);

  async function handleCepBlur(cep: string) {
    const result = await lookupCep(cep);
    if (result) {
      setValue("street", result.street);
      setValue("neighborhood", result.neighborhood);
      setValue("city", result.city);
      setValue("state", result.state);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-base font-semibold text-gray-900">
            {editing ? "Editar Cliente" : "Novo Cliente"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            x
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-6">
          {serverError && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          <section className="space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Dados Basicos
            </p>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Nome completo *
              </label>
              <input
                {...register("name")}
                className={inputCls}
                placeholder="Ex: Joao da Silva"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  CPF / CNPJ
                </label>
                <Controller
                  name="cpf_cnpj"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      value={field.value ? maskCpfCnpj(field.value) : ""}
                      onChange={(e) =>
                        field.onChange(maskCpfCnpj(e.target.value))
                      }
                      className={inputCls}
                      placeholder="000.000.000-00"
                    />
                  )}
                />
                {errors.cpf_cnpj && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.cpf_cnpj.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      value={field.value ? maskPhone(field.value) : ""}
                      onChange={(e) =>
                        field.onChange(maskPhone(e.target.value))
                      }
                      className={inputCls}
                      placeholder="(11) 99999-9999"
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className={inputCls}
                  placeholder="email@exemplo.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <select {...register("status")} className={inputCls}>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>
            </div>
          </section>

          <ClientAddressFields
            register={register}
            control={control}
            cepLoading={cepLoading}
            onCepBlur={handleCepBlur}
          />

          <section className="space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Observacoes
            </p>
            <textarea
              {...register("notes")}
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
              placeholder="Anotacoes internas sobre o cliente..."
            />
          </section>

          <div className="flex justify-end gap-3 pt-1 border-t border-gray-100">
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
              className="px-5 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg disabled:opacity-60 transition-colors"
            >
              {loading ? "Salvando..." : "Salvar Cliente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
