import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../services/documents-api";

export function useDocuments() {
  return useQuery({ queryKey: ["documents"], queryFn: getDocuments });
}
