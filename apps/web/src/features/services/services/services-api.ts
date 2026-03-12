import { apiClient } from "@/lib/api-client";
import type { CreateServiceInput, Service } from "../types/service.types";

export async function getServices(): Promise<Service[]> {
  return apiClient.get("/services").then((res) => res.data);
}

export async function getService(id: string): Promise<Service> {
  return apiClient.get(`/services/${id}`).then((res) => res.data);
}

export async function createService(
  data: CreateServiceInput,
): Promise<Service> {
  return apiClient.post("/services", data).then((res) => res.data);
}

export async function updateService(
  id: string,
  data: Partial<CreateServiceInput>,
): Promise<Service> {
  return apiClient.patch(`/services/${id}`, data).then((res) => res.data);
}

export async function deleteService(id: string): Promise<void> {
  return apiClient.delete(`/services/${id}`).then((res) => res.data);
}
