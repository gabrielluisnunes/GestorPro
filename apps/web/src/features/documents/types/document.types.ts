export interface Document {
  id: string;
  file_url: string;
  filename?: string;
  client_id?: string;
  service_id?: string;
  contract_id?: string;
  uploaded_at: string;
}

export interface CreateDocumentInput {
  file_url: string;
  filename?: string;
  client_id?: string;
  service_id?: string;
  contract_id?: string;
}
