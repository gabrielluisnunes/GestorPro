import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "../../database/entities/client.entity";
import { EventEntity } from "../../database/entities/event.entity";
import { PaymentEntity } from "../../database/entities/payment.entity";
import { ServiceEntity } from "../../database/entities/service.entity";
import { AuthModule } from "../auth/auth.module";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      ServiceEntity,
      PaymentEntity,
      EventEntity,
    ]),
    AuthModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
