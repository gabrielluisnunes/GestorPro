"use client";

import { useClients } from "@/features/clients/hooks/use-clients";
import { useState } from "react";
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Documentos</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Arquivos e documentos dos clientes
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
        >
          + Enviar Documento
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {isLoading ? (
          <div className="text-center py-16 text-gray-400">Carregando...</div>
        ) : (
          <DocumentList documents={documents} onDelete={handleDelete} />
        )}
      </div>

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
