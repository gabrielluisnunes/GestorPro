"use client";

import { useClients } from "@/features/clients/hooks/use-clients";
import type { Document } from "../types/document.types";

function fmtDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function FileIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

interface Props {
  documents: Document[];
  onDelete: (id: string) => void;
}

export function DocumentList({ documents, onDelete }: Props) {
  const { data: clients = [] } = useClients();

  function getClientName(client_id?: string) {
    if (!client_id) return "-";
    const client = clients.find((c) => c.id === client_id);
    return client ? client.name : "-";
  }

  function getFileSize(_file_url?: string) {
    // Placeholder: em produção, o tamanho viria do backend
    return "--";
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-base">Nenhum documento enviado ainda.</p>
        <p className="text-sm mt-1">
          Clique em "Upload de Arquivo" para adicionar.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[700px] w-full text-sm border-separate border-spacing-y-2">
        <thead>
          <tr className="text-xs text-gray-500 font-semibold">
            <th className="px-3 py-2 text-left"> </th>
            <th className="px-3 py-2 text-left">NOME DO ARQUIVO</th>
            <th className="px-3 py-2 text-left">CLIENTE / SERVIÇO</th>
            <th className="px-3 py-2 text-left">DATA DE UPLOAD</th>
            <th className="px-3 py-2 text-left">TAMANHO</th>
            <th className="px-3 py-2 text-left">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="bg-white rounded-xl shadow-sm">
              <td className="px-3 py-2 align-middle">
                <FileIcon />
              </td>
              <td className="px-3 py-2 align-middle max-w-[180px] truncate">
                <div className="font-medium text-gray-900 flex items-center gap-2 truncate">
                  {doc.filename ?? "Documento"}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Contrato</div>
              </td>
              <td className="px-3 py-2 align-middle max-w-[160px] truncate">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-bold text-gray-500">
                    {getClientName(doc.client_id)
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                  <span className="text-gray-900 text-xs font-medium truncate">
                    {getClientName(doc.client_id)}
                  </span>
                </div>
              </td>
              <td className="px-3 py-2 align-middle whitespace-nowrap">
                {fmtDate(doc.uploaded_at)}
              </td>
              <td className="px-3 py-2 align-middle whitespace-nowrap">
                {getFileSize(doc.file_url)}
              </td>
              <td className="px-3 py-2 align-middle">
                <div className="flex gap-2">
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary-600 hover:underline"
                  >
                    Ver
                  </a>
                  <button
                    onClick={() => onDelete(doc.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-xs text-gray-500 gap-2">
        <span>
          Mostrando 1 a {documents.length} de {documents.length} arquivos
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded border border-gray-200 bg-white text-gray-400 hover:bg-gray-50">
            Anterior
          </button>
          <button className="px-3 py-1 rounded border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
