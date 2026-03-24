import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDocument, uploadDocumentMultipart } from "../services/documents-api";
import type { CreateDocumentInput } from "../types/document.types";

export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDocumentInput) => createDocument(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["documents"] }),
  });
}

export function useUploadDocumentMultipart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => uploadDocumentMultipart(formData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["documents"] }),
  });
}
