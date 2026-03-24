"use client";

import { CloudUpload } from "lucide-react";
import { useRef } from "react";

interface DocumentDropzoneProps {
  onDrop?: (files: FileList) => void;
}

export function DocumentDropzone({ onDrop }: DocumentDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function emitFiles(files: FileList | null) {
    if (onDrop && files && files.length > 0) {
      onDrop(files);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    emitFiles(e.dataTransfer.files);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleClick() {
    inputRef.current?.click();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputRef.current?.click();
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    emitFiles(e.target.files);
    e.currentTarget.value = "";
  }

  return (
    <div
      className="mt-8 flex flex-col items-center justify-center border-2 border-dashed border-primary-200 rounded-xl py-10 sm:py-12 bg-primary-50 text-primary-600 text-center cursor-pointer hover:border-primary-400 transition-colors w-full max-w-2xl mx-auto px-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Área para upload de arquivos"
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
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
  );
}
