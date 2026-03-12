import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEvent } from "../services/events-api";
import type { CreateEventInput } from "../types/event.types";

export function useUpdateEvent(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateEventInput>) => updateEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["events", id] });
    },
  });
}
