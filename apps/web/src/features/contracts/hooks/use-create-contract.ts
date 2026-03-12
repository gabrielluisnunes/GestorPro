import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContract } from "../services/contracts-api";
import type { CreateContractInput } from "../types/contract.types";

export function useCreateContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContractInput) => createContract(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contracts"] }),
  });
}
