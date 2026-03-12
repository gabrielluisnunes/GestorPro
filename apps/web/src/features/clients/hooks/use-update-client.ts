import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClient } from "../services/clients-api";
import type { CreateClientInput } from "../types/client.types";

export function useUpdateClient(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateClientInput>) => updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["clients", id] });
    },
  });
}
