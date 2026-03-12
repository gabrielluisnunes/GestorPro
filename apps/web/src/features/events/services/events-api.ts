import { apiClient } from "@/lib/api-client";
import type { CreateEventInput, Event } from "../types/event.types";

export async function getEvents(): Promise<Event[]> {
  return apiClient.get("/events").then((res) => res.data);
}

export async function getEvent(id: string): Promise<Event> {
  return apiClient.get(`/events/${id}`).then((res) => res.data);
}

export async function createEvent(data: CreateEventInput): Promise<Event> {
  return apiClient.post("/events", data).then((res) => res.data);
}

export async function updateEvent(
  id: string,
  data: Partial<CreateEventInput>,
): Promise<Event> {
  return apiClient.patch(`/events/${id}`, data).then((res) => res.data);
}

export async function deleteEvent(id: string): Promise<void> {
  return apiClient.delete(`/events/${id}`).then((res) => res.data);
}
