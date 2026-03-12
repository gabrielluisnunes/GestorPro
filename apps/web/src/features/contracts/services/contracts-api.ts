import { apiClient } from "@/lib/api-client";
import type { Contract, CreateContractInput } from "../types/contract.types";

export async function getContracts(): Promise<Contract[]> {
  return apiClient.get("/contracts").then((res) => res.data);
}

export async function getContract(id: string): Promise<Contract> {
  return apiClient.get(`/contracts/${id}`).then((res) => res.data);
}

export async function createContract(
  data: CreateContractInput,
): Promise<Contract> {
  return apiClient.post("/contracts", data).then((res) => res.data);
}

export async function updateContract(
  id: string,
  data: Partial<CreateContractInput>,
): Promise<Contract> {
  return apiClient.patch(`/contracts/${id}`, data).then((res) => res.data);
}

export async function deleteContract(id: string): Promise<void> {
  return apiClient.delete(`/contracts/${id}`).then((res) => res.data);
}
