import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateContract } from "../services/contracts-api";
import type { CreateContractInput } from "../types/contract.types";

export function useUpdateContract(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateContractInput>) =>
      updateContract(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      queryClient.invalidateQueries({ queryKey: ["contracts", id] });
    },
  });
}
