export type PaymentStatus = "pendente" | "pago" | "atrasado";

export interface Payment {
  id: string;
  contract_id: string;
  value: number;
  due_date: string;
  payment_date?: string;
  status: PaymentStatus;
}

export interface CreatePaymentInput {
  contract_id: string;
  value: number;
  due_date: string;
  payment_date?: string;
  status?: PaymentStatus;
}
