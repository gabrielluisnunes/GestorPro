import { useQuery } from "@tanstack/react-query";
import { getEvent } from "../services/events-api";

export function useEvent(id: string) {
  return useQuery({
    queryKey: ["events", id],
    queryFn: () => getEvent(id),
    enabled: !!id,
  });
}
