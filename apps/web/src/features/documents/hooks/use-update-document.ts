import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDocument } from "../services/documents-api";
import type { CreateDocumentInput } from "../types/document.types";

export function useUpdateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateDocumentInput>;
    }) => updateDocument(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["documents"] }),
  });
}
