export interface Client {
  id: string;
  name: string;
  cpf_cnpj?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}

export interface CreateClientInput {
  name: string;
  cpf_cnpj?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}
