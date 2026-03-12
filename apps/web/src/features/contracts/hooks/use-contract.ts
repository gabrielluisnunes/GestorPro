import { useQuery } from "@tanstack/react-query";
import { getContract } from "../services/contracts-api";

export function useContract(id: string) {
  return useQuery({
    queryKey: ["contracts", id],
    queryFn: () => getContract(id),
    enabled: !!id,
  });
}
