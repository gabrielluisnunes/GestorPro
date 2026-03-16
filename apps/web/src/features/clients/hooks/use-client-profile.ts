import { useQuery } from "@tanstack/react-query";
import { getClient } from "../services/clients-api";

export function useClientProfile(id: string) {
  return useQuery({
    queryKey: ["clients", id],
    queryFn: () => getClient(id),
    enabled: !!id,
  });
}
