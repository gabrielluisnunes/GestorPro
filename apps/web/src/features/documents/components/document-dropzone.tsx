"use client";

import type { Client } from "@/features/clients/types/client.types";
import { CloudUpload } from "lucide-react";
import { useRef } from "react";

interface DocumentDropzoneProps {
  clients: Client[];
  clientId: string;
  onClientIdChange: (clientId: string) => void;
  onFilesSelected: (files: FileList) => void;
  disabled?: boolean;
}

const selectCls =
  "w-full max-w-md border border-primary-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500";

export function DocumentDropzone({
  clients,
  clientId,
  onClientIdChange,
  onFilesSelected,
  disabled,
}: DocumentDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function emitFiles(files: FileList | null) {
    if (!clientId) return;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!clientId) return;
    emitFiles(e.dataTransfer.files);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleClick() {
    if (!clientId || disabled) return;
    inputRef.current?.click();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    emitFiles(e.target.files);
    e.currentTarget.value = "";
  }

  const zoneDisabled = disabled || !clientId;

  return (
    <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-2xl mx-auto px-4">
      <div className="w-full max-w-md">
        <label
          htmlFor="document-dropzone-client"
          className="text-sm font-medium text-gray-700"
        >
          Cliente (obrigatório para envio)
        </label>
        <select
          id="document-dropzone-client"
          value={clientId}
          onChange={(e) => onClientIdChange(e.target.value)}
          className={`${selectCls} mt-1`}
        >
          <option value="">Selecione um cliente</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {!clientId && (
          <p className="text-xs text-primary-500 mt-1">
            Escolha um cliente para associar o documento antes de enviar.
          </p>
        )}
      </div>

      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed border-primary-200 rounded-xl py-10 sm:py-12 bg-primary-50 text-primary-600 text-center transition-colors w-full px-4 ${
          zoneDisabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:border-primary-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={zoneDisabled ? -1 : 0}
        role="button"
        aria-disabled={zoneDisabled}
        aria-label="Área para upload de arquivos"
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          disabled={zoneDisabled}
          onChange={handleFileChange}
        />
        <CloudUpload size={40} className="mb-3 text-primary-300" />
        <p className="font-semibold text-base mb-1">
          Arraste novos arquivos para upload
        </p>
        <p className="text-sm text-primary-400">
          Suporta PDF, DOCX, PNG e JPG (Max 50MB)
        </p>
      </div>
    </div>
  );
}
