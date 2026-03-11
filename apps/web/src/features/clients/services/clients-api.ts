import { apiClient } from "@/lib/api-client";
import type { Client, CreateClientInput } from "../types/client.types";

export const clientsService = {
  getAll: (): Promise<Client[]> =>
    apiClient.get("/clients").then((res) => res.data),

  getOne: (id: string): Promise<Client> =>
    apiClient.get(`/clients/${id}`).then((res) => res.data),

  create: (data: CreateClientInput): Promise<Client> =>
    apiClient.post("/clients", data).then((res) => res.data),

  update: (id: string, data: Partial<CreateClientInput>): Promise<Client> =>
    apiClient.patch(`/clients/${id}`, data).then((res) => res.data),

  remove: (id: string): Promise<void> =>
    apiClient.delete(`/clients/${id}`).then((res) => res.data),
};
