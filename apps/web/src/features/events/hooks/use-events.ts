import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services/events-api";

export function useEvents() {
  return useQuery({ queryKey: ["events"], queryFn: getEvents });
}
