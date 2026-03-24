"use client";

import type { Client } from "@/features/clients/types/client.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  client_id: z
    .string()
    .min(1, "Selecione um cliente")
    .uuid("Selecione um cliente"),
});

type UploadModalFields = z.infer<typeof schema>;

interface Props {
  open: boolean;
  clients: Client[];
  loading?: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
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
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UploadModalFields>({
    resolver: zodResolver(schema),
    defaultValues: { client_id: "" },
  });

  useEffect(() => {
    if (open) {
      reset({ client_id: "" });
      setFile(null);
      setFileError(null);
    }
  }, [open, reset]);

  if (!open) return null;

  function submit(data: UploadModalFields) {
    if (!file) {
      setFileError("Selecione um arquivo");
      return;
    }
    setFileError(null);
    const multipart = new FormData();
    multipart.append("file", file);
    multipart.append("client_id", data.client_id);
    onSubmit(multipart);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          Enviar Documento
        </h2>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Arquivo *
            </label>
            <input
              type="file"
              className={inputCls}
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setFile(f);
                if (f) setFileError(null);
              }}
            />
            {fileError && (
              <p className="text-xs text-red-500 mt-1">{fileError}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Cliente *
            </label>
            <select {...register("client_id")} className={inputCls}>
              <option value="">Selecione</option>
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
