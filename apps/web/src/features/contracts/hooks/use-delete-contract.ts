import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContract } from "../services/contracts-api";

export function useDeleteContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteContract(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contracts"] }),
  });
}
