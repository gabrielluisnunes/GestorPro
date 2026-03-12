import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "../services/clients-api";
import type { CreateClientInput } from "../types/client.types";

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClientInput) => createClient(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
  });
}
