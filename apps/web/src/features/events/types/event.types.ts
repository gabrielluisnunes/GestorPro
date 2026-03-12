export type EventType = "reuniao" | "prazo" | "audiencia" | "sessao" | "tarefa";

export interface Event {
  id: string;
  user_id: string;
  client_id?: string;
  title: string;
  type: EventType;
  date: string;
  time?: string;
  notes?: string;
}

export interface CreateEventInput {
  title: string;
  type?: EventType;
  date: string;
  time?: string;
  client_id?: string;
  notes?: string;
}
