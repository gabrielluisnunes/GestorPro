export enum ServiceStatus {
  ACTIVE = "ativo",
  WAITING = "aguardando",
  FINISHED = "finalizado",
}

export enum PaymentStatus {
  PENDING = "pendente",
  PAID = "pago",
  OVERDUE = "atrasado",
}

export enum EventType {
  MEETING = "reunião",
  DEADLINE = "prazo",
  HEARING = "audiência",
  SESSION = "sessão",
  TASK = "tarefa",
}
