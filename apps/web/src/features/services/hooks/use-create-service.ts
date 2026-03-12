import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createService } from "../services/services-api";
import type { CreateServiceInput } from "../types/service.types";

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateServiceInput) => createService(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
}
