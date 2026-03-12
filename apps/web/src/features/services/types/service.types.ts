export type ServiceStatus = "ativo" | "aguardando" | "finalizado";

export interface Service {
  id: string;
  client_id: string;
  title: string;
  description?: string;
  status: ServiceStatus;
  start_date?: string;
  end_date?: string;
  notes?: string;
}

export interface CreateServiceInput {
  client_id: string;
  title: string;
  description?: string;
  status?: ServiceStatus;
  start_date?: string;
  end_date?: string;
  notes?: string;
}
