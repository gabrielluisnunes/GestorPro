"use client";

import { useClients } from "@/features/clients/hooks/use-clients";
import { useState } from "react";
import { DocumentDropzone } from "./components/document-dropzone";
import { DocumentList } from "./components/document-list";
import { DocumentUploadModal } from "./components/document-upload-modal";
import { useDeleteDocument } from "./hooks/use-delete-document";
import { useDocuments } from "./hooks/use-documents";
import { useUploadDocument } from "./hooks/use-upload-document";
import type { CreateDocumentInput } from "./types/document.types";

export default function DocumentsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const { data: documents = [], isLoading } = useDocuments();
  const { data: clients = [] } = useClients();
  const uploadDocument = useUploadDocument();
  const deleteDocument = useDeleteDocument();

  function handleUpload(data: CreateDocumentInput) {
    uploadDocument.mutate(data, { onSuccess: () => setModalOpen(false) });
  }

  function handleDelete(id: string) {
    if (confirm("Deseja excluir este documento?")) deleteDocument.mutate(id);
  }

  return (
    <div>
      {/* Header e barra de busca/filtros */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Documentos</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
          >
            <span className="hidden sm:inline">Upload de Arquivo</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <input
            type="text"
            placeholder="Buscar por nome, cliente ou formato..."
            className="w-full md:max-w-xs px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary-400 focus:bg-white transition-colors placeholder:text-gray-400"
          />
          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-primary-100 bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors">
              Todos os Arquivos
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-100 bg-white text-gray-600 hover:bg-gray-50 transition-colors">
              PDFs
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-100 bg-white text-gray-600 hover:bg-gray-50 transition-colors">
              Documentos
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-100 bg-white text-gray-600 hover:bg-gray-50 transition-colors">
              Imagens
            </button>
          </div>
          <div className="flex gap-1 ml-auto">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-400 hover:bg-gray-50 transition-colors">
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-primary-100 bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors">
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="4" rx="1.5" />
                <rect x="3" y="10" width="18" height="4" rx="1.5" />
                <rect x="3" y="16" width="18" height="4" rx="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {isLoading ? (
          <div className="text-center py-16 text-gray-400">Carregando...</div>
        ) : (
          <DocumentList documents={documents} onDelete={handleDelete} />
        )}
      </div>

      <DocumentDropzone />

      <DocumentUploadModal
        open={modalOpen}
        clients={clients}
        loading={uploadDocument.isPending}
        onClose={() => setModalOpen(false)}
        onSubmit={handleUpload}
      />
    </div>
  );
}
