export interface PaymentsSummary {
  count: number;
  total: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type?: string;
  client_id?: string;
}

export interface DashboardSummary {
  total_clients: number;
  active_services: number;
  monthly_revenue: string;
  pending_payments: PaymentsSummary;
  overdue_payments: PaymentsSummary;
  upcoming_events: UpcomingEvent[];
}
