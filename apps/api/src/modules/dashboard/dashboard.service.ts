import { Injectable } from "@nestjs/common";

@Injectable()
export class DashboardService {
  getSummary() {
    // TODO: aggregate monthly revenue, pending/overdue payments, active clients, today's events
    throw new Error("Not implemented");
  }
}
