"use client";

import { useContracts } from "@/features/contracts/hooks/use-contracts";
import { useState } from "react";
import { PaymentFormModal } from "./components/payment-form-modal";
import { PaymentTable } from "./components/payment-table";
import { useCreatePayment } from "./hooks/use-create-payment";
import { usePayments } from "./hooks/use-payments";
import { useUpdatePayment } from "./hooks/use-update-payment";
import type { CreatePaymentInput, Payment } from "./types/payment.types";

export default function PaymentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Payment | null>(null);

  const { data: payments = [], isLoading } = usePayments();
  const { data: contracts = [] } = useContracts();
  const createPayment = useCreatePayment();
  const updatePayment = useUpdatePayment(editing?.id ?? "");

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(payment: Payment) {
    setEditing(payment);
    setModalOpen(true);
  }

  function handleSubmit(data: CreatePaymentInput) {
    if (editing) {
      updatePayment.mutate(data, { onSuccess: () => setModalOpen(false) });
    } else {
      createPayment.mutate(data, { onSuccess: () => setModalOpen(false) });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Pagamentos</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Controle de cobranças e recebimentos
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
        >
          + Novo Pagamento
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {isLoading ? (
          <div className="text-center py-16 text-gray-400">Carregando...</div>
        ) : (
          <PaymentTable payments={payments} onEdit={openEdit} />
        )}
      </div>

      <PaymentFormModal
        open={modalOpen}
        editing={editing}
        contracts={contracts}
        loading={createPayment.isPending || updatePayment.isPending}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
