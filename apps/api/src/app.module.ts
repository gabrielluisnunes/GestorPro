import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./modules/auth/auth.module";
import { ClientsModule } from "./modules/clients/clients.module";
import { ContractsModule } from "./modules/contracts/contracts.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { DocumentsModule } from "./modules/documents/documents.module";
import { EventsModule } from "./modules/events/events.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { ServicesModule } from "./modules/services/services.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get<string>("DB_HOST", "localhost"),
        port: config.get<number>("DB_PORT", 5432),
        username: config.get<string>("DB_USERNAME", "gabrielnunes"),
        password: config.get<string>("DB_PASSWORD", ""),
        database: config.get<string>("DB_DATABASE", "gestorpro"),
        entities: [__dirname + "/database/entities/*.entity{.ts,.js}"],
        migrations: [__dirname + "/database/migrations/*{.ts,.js}"],
        synchronize: false,
        logging: config.get<string>("NODE_ENV") !== "production",
      }),
    }),
    AuthModule,
    UsersModule,
    ClientsModule,
    ServicesModule,
    ContractsModule,
    PaymentsModule,
    DocumentsModule,
    EventsModule,
    DashboardModule,
  ],
})
export class AppModule {}
