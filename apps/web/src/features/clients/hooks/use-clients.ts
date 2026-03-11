import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clientsService } from "../services/clients-api";
import type { CreateClientInput } from "../types/client.types";

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: clientsService.getAll,
  });
}

export function useClient(id: string) {
  return useQuery({
    queryKey: ["clients", id],
    queryFn: () => clientsService.getOne(id),
    enabled: !!id,
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateClientInput) => clientsService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => clientsService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
  });
}
