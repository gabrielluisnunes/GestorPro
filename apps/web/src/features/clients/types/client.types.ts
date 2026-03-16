export type ClientStatus = "ativo" | "inativo";

export interface Client {
  id: string;
  name: string;
  cpf_cnpj?: string;
  phone?: string;
  email?: string;
  status?: ClientStatus;
  // Endereço estruturado
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  // Relações (carregadas pelo backend)
  services?: ClientService[];
  contracts?: ClientContract[];
  documents?: ClientDocument[];
  events?: ClientEvent[];
}

export interface CreateClientInput {
  name: string;
  cpf_cnpj?: string;
  phone?: string;
  email?: string;
  status?: ClientStatus;
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  notes?: string;
}

// Nested types (inline para evitar imports circulares)
export interface ClientService {
  id: string;
  title: string;
  description?: string;
  status: "ativo" | "aguardando" | "finalizado";
  start_date?: string;
  end_date?: string;
  notes?: string;
  created_at?: string;
}

export interface ClientPayment {
  id: string;
  value: number;
  due_date: string;
  payment_date?: string;
  status: "pendente" | "pago" | "atrasado";
  created_at?: string;
}

export interface ClientContract {
  id: string;
  value: number;
  installments?: number;
  start_date?: string;
  due_date?: string;
  file_url?: string;
  payments?: ClientPayment[];
  created_at?: string;
}

export interface ClientDocument {
  id: string;
  file_url: string;
  filename?: string;
  uploaded_at: string;
}

export interface ClientEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  time?: string;
  notes?: string;
  created_at?: string;
}

export interface TimelineItem {
  id: string;
  type: "payment" | "contract" | "event" | "created" | "document";
  title: string;
  description: string;
  date: string;
}

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
