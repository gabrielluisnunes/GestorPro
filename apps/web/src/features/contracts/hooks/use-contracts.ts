import { useQuery } from "@tanstack/react-query";
import { getContracts } from "../services/contracts-api";

export function useContracts() {
  return useQuery({ queryKey: ["contracts"], queryFn: getContracts });
}
