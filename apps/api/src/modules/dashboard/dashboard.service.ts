import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { ClientEntity } from "../../database/entities/client.entity";
import { EventEntity } from "../../database/entities/event.entity";
import {
  PaymentEntity,
  PaymentStatus,
} from "../../database/entities/payment.entity";
import {
  ServiceEntity,
  ServiceStatus,
} from "../../database/entities/service.entity";

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepo: Repository<ClientEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepo: Repository<ServiceEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepo: Repository<PaymentEntity>,
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,
  ) {}

  async getSummary(userId: string) {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .slice(0, 10);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .slice(0, 10);
    const today = now.toISOString().slice(0, 10);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    const [
      totalClients,
      activeServices,
      monthlyRevenue,
      pendingPayments,
      overduePayments,
      upcomingEvents,
    ] = await Promise.all([
      // Total de clientes do usuário
      this.clientRepo.count({ where: { user_id: userId } }),

      // Serviços ativos do usuário
      this.serviceRepo
        .createQueryBuilder("service")
        .innerJoin("service.client", "client")
        .where("client.user_id = :userId AND service.status = :status", {
          userId,
          status: ServiceStatus.ACTIVE,
        })
        .getCount(),

      // Receita do mês (pagamentos pagos no mês atual)
      this.paymentRepo
        .createQueryBuilder("payment")
        .innerJoin("payment.contract", "contract")
        .innerJoin("contract.client", "client")
        .select("COALESCE(SUM(payment.value), 0)", "total")
        .where(
          "client.user_id = :userId AND payment.status = :status AND payment.payment_date BETWEEN :start AND :end",
          {
            userId,
            status: PaymentStatus.PAID,
            start: firstDayOfMonth,
            end: lastDayOfMonth,
          },
        )
        .getRawOne<{ total: string }>(),

      // Pagamentos pendentes
      this.paymentRepo
        .createQueryBuilder("payment")
        .innerJoin("payment.contract", "contract")
        .innerJoin("contract.client", "client")
        .select([
          "COUNT(payment.id) AS count",
          "COALESCE(SUM(payment.value), 0) AS total",
        ])
        .where("client.user_id = :userId AND payment.status = :status", {
          userId,
          status: PaymentStatus.PENDING,
        })
        .getRawOne<{ count: string; total: string }>(),

      // Pagamentos atrasados
      this.paymentRepo
        .createQueryBuilder("payment")
        .innerJoin("payment.contract", "contract")
        .innerJoin("contract.client", "client")
        .select([
          "COUNT(payment.id) AS count",
          "COALESCE(SUM(payment.value), 0) AS total",
        ])
        .where("client.user_id = :userId AND payment.status = :status", {
          userId,
          status: PaymentStatus.OVERDUE,
        })
        .getRawOne<{ count: string; total: string }>(),

      // Próximos eventos (hoje + 7 dias)
      this.eventRepo.find({
        where: { user_id: userId, date: Between(today, nextWeek) },
        order: { date: "ASC", time: "ASC" },
        take: 10,
      }),
    ]);

    return {
      total_clients: totalClients,
      active_services: activeServices,
      monthly_revenue: parseFloat(monthlyRevenue?.total ?? "0"),
      pending_payments: {
        count: parseInt(pendingPayments?.count ?? "0", 10),
        total: parseFloat(pendingPayments?.total ?? "0"),
      },
      overdue_payments: {
        count: parseInt(overduePayments?.count ?? "0", 10),
        total: parseFloat(overduePayments?.total ?? "0"),
      },
      upcoming_events: upcomingEvents,
    };
  }
}
