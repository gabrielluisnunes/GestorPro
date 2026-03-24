import { apiClient } from "@/lib/api-client";
import type { CreateDocumentInput, Document } from "../types/document.types";

export async function getDocuments(): Promise<Document[]> {
  return apiClient.get("/documents").then((res) => res.data);
}

export async function getDocument(id: string): Promise<Document> {
  return apiClient.get(`/documents/${id}`).then((res) => res.data);
}

export async function createDocument(
  data: CreateDocumentInput,
): Promise<Document> {
  return apiClient.post("/documents", data).then((res) => res.data);
}

export async function uploadDocumentMultipart(
  formData: FormData,
): Promise<Document> {
  return apiClient.post("/documents/upload", formData).then((res) => res.data);
}

export async function deleteDocument(id: string): Promise<void> {
  return apiClient.delete(`/documents/${id}`).then((res) => res.data);
}

export async function updateDocument(
  id: string,
  data: Partial<CreateDocumentInput>,
): Promise<Document> {
  return apiClient.patch(`/documents/${id}`, data).then((res) => res.data);
}
