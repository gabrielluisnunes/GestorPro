import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePayment } from "../services/payments-api";
import type { CreatePaymentInput } from "../types/payment.types";

export function useUpdatePayment(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreatePaymentInput>) => updatePayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["payments", id] });
    },
  });
}
