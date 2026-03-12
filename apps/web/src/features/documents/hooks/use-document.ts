import { useQuery } from "@tanstack/react-query";
import { getDocument } from "../services/documents-api";

export function useDocument(id: string) {
  return useQuery({
    queryKey: ["documents", id],
    queryFn: () => getDocument(id),
    enabled: !!id,
  });
}
