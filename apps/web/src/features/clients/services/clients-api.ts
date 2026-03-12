import { apiClient } from "@/lib/api-client";
import type { Client, CreateClientInput } from "../types/client.types";

export async function getClients(): Promise<Client[]> {
  return apiClient.get("/clients").then((res) => res.data);
}

export async function getClient(id: string): Promise<Client> {
  return apiClient.get(`/clients/${id}`).then((res) => res.data);
}

export async function createClient(data: CreateClientInput): Promise<Client> {
  return apiClient.post("/clients", data).then((res) => res.data);
}

export async function updateClient(
  id: string,
  data: Partial<CreateClientInput>,
): Promise<Client> {
  return apiClient.patch(`/clients/${id}`, data).then((res) => res.data);
}

export async function deleteClient(id: string): Promise<void> {
  return apiClient.delete(`/clients/${id}`).then((res) => res.data);
}
