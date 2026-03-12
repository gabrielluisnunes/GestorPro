import { useQuery } from "@tanstack/react-query";
import { getPayment } from "../services/payments-api";

export function usePayment(id: string) {
  return useQuery({
    queryKey: ["payments", id],
    queryFn: () => getPayment(id),
    enabled: !!id,
  });
}
