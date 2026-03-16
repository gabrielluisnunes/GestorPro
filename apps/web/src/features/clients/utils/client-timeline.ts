import type { Client, TimelineItem } from "../types/client.types";

export function buildClientTimeline(client: Client): TimelineItem[] {
  const items: TimelineItem[] = [];

  if (client.created_at) {
    items.push({
      id: "created",
      type: "created",
      title: "Cliente Criado",
      description: "Perfil adicionado ao sistema.",
      date: client.created_at,
    });
  }

  (client.contracts ?? []).forEach((c) => {
    if (c.created_at) {
      items.push({
        id: `contract-${c.id}`,
        type: "contract",
        title: "Contrato Assinado",
        description: `Contrato no valor de R$\u00a0${Number(c.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}.`,
        date: c.created_at,
      });
    }
    (c.payments ?? []).forEach((p) => {
      if (p.status === "pago" && p.payment_date) {
        items.push({
          id: `payment-${p.id}`,
          type: "payment",
          title: "Pagamento Recebido",
          description: `Fatura de R$\u00a0${Number(p.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} liquidada.`,
          date: p.payment_date,
        });
      }
    });
  });

  (client.events ?? []).forEach((e) => {
    items.push({
      id: `event-${e.id}`,
      type: "event",
      title: e.title,
      description: `Evento agendado para ${new Date(e.date).toLocaleDateString("pt-BR")}.`,
      date: e.created_at ?? e.date,
    });
  });

  (client.documents ?? []).forEach((d) => {
    items.push({
      id: `doc-${d.id}`,
      type: "document",
      title: "Documento Adicionado",
      description: d.filename ?? "Arquivo enviado.",
      date: d.uploaded_at,
    });
  });

  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
