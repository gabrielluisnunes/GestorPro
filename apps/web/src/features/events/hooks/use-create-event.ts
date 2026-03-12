import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../services/events-api";
import type { CreateEventInput } from "../types/event.types";

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventInput) => createEvent(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}
