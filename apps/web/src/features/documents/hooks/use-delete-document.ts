import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDocument } from '../services/documents-api';

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDocument(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['documents'] }),
  });
}
