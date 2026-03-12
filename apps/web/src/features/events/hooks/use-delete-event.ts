import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "../services/events-api";

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}
