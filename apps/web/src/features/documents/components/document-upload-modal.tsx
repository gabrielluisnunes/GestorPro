"use client";

import type { Client } from "@/features/clients/types/client.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { CreateDocumentInput } from "../types/document.types";

const schema = z.object({
  file_url: z.string().url("URL inválida").min(1, "URL obrigatória"),
  filename: z.string().optional(),
  client_id: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  clients: Client[];
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: CreateDocumentInput) => void;
}

const inputCls =
  "mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors";

export function DocumentUploadModal({
  open,
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
    if (open) reset({ file_url: "", filename: "", client_id: "" });
  }, [open, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          Enviar Documento
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              URL do arquivo *
            </label>
            <input
              {...register("file_url")}
              placeholder="https://..."
              className={inputCls}
            />
            {errors.file_url && (
              <p className="text-xs text-red-500 mt-1">
                {errors.file_url.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Nome do arquivo
            </label>
            <input
              {...register("filename")}
              placeholder="contrato.pdf"
              className={inputCls}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Cliente (opcional)
            </label>
            <select {...register("client_id")} className={inputCls}>
              <option value="">Nenhum</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
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
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
