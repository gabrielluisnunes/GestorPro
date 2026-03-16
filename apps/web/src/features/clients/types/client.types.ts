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
