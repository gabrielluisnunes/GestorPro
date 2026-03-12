export interface Contract {
  id: string;
  client_id: string;
  value: number;
  installments?: number;
  start_date?: string;
  due_date?: string;
  interest_rate?: number;
  file_url?: string;
}

export interface CreateContractInput {
  client_id: string;
  value: number;
  installments?: number;
  start_date?: string;
  due_date?: string;
  interest_rate?: number;
  file_url?: string;
}
