"use client";

import { Download, FileText } from "lucide-react";
import type { ClientDocument } from "../types/client.types";

interface Props {
  documents: ClientDocument[];
}

export function ClientDocumentsTab({ documents }: Props) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p className="text-sm">Nenhum documento vinculado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((d) => (
        <div
          key={d.id}
          className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {d.filename ?? "Documento"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(d.uploaded_at).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
          {d.file_url && (
            <a
              href={d.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Download className="w-4 h-4" />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
