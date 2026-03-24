"use client";

import { CloudUpload } from "lucide-react";

interface DocumentDropzoneProps {
  onDrop?: (files: FileList) => void;
}

export function DocumentDropzone({ onDrop }: DocumentDropzoneProps) {
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (onDrop && e.dataTransfer.files.length > 0) {
      onDrop(e.dataTransfer.files);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <div
      className="mt-8 flex flex-col items-center justify-center border-2 border-dashed border-primary-200 rounded-xl py-10 sm:py-12 bg-primary-50 text-primary-600 text-center cursor-pointer hover:border-primary-400 transition-colors w-full max-w-2xl mx-auto px-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      tabIndex={0}
      role="button"
      aria-label="Área para upload de arquivos"
    >
      <CloudUpload size={40} className="mb-3 text-primary-300" />
      <p className="font-semibold text-base mb-1">
        Arraste novos arquivos para upload
      </p>
      <p className="text-sm text-primary-400">
        Suporta PDF, DOCX, PNG e JPG (Max 50MB)
      </p>
    </div>
  );
}
