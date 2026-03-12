import { useQuery } from "@tanstack/react-query";
import { getService } from "../services/services-api";

export function useService(id: string) {
  return useQuery({
    queryKey: ["services", id],
    queryFn: () => getService(id),
    enabled: !!id,
  });
}
