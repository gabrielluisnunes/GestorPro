import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../services/payments-api";

export function usePayments() {
  return useQuery({ queryKey: ["payments"], queryFn: getPayments });
}
