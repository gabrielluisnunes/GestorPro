import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService } from "../services/services-api";

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteService(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
}
