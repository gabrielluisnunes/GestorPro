"use client";

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
  if (documents.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-base">Nenhum documento enviado ainda.</p>
        <p className="text-sm mt-1">
          Clique em "Enviar Documento" para adicionar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex flex-col gap-2 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
        >
          <div className="flex items-start gap-3">
            <div className="text-gray-400 mt-0.5 shrink-0">
              <FileIcon />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {doc.filename ?? "Documento"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {fmtDate(doc.uploaded_at)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-1">
            <a
              href={doc.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary-600 hover:underline"
            >
              Ver arquivo
            </a>
            <button
              onClick={() => onDelete(doc.id)}
              className="text-xs text-red-500 hover:underline"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
