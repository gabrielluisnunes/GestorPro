import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateService } from "../services/services-api";
import type { CreateServiceInput } from "../types/service.types";

export function useUpdateService(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateServiceInput>) => updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["services", id] });
    },
  });
}
