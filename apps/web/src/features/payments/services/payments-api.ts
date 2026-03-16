import { apiClient } from "@/lib/api-client";
import type { CreatePaymentInput, Payment } from "../types/payment.types";

export async function getPayments(): Promise<Payment[]> {
  return apiClient.get("/payments").then((res) => res.data);
}

export async function getPayment(id: string): Promise<Payment> {
  return apiClient.get(`/payments/${id}`).then((res) => res.data);
}

export async function createPayment(
  data: CreatePaymentInput,
): Promise<Payment> {
  return apiClient.post("/payments", data).then((res) => res.data);
}

export async function updatePayment(
  id: string,
  data: Partial<CreatePaymentInput>,
): Promise<Payment> {
  return apiClient.patch(`/payments/${id}`, data).then((res) => res.data);
}

export async function deletePayment(id: string): Promise<void> {
  return apiClient.delete(`/payments/${id}`).then((res) => res.data);
}
