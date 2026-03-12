import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment } from "../services/payments-api";
import type { CreatePaymentInput } from "../types/payment.types";

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePaymentInput) => createPayment(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["payments"] }),
  });
}
