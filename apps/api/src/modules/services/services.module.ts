import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceEntity } from "../../database/entities/service.entity";
import { AuthModule } from "../auth/auth.module";
import { ServicesController } from "./services.controller";
import { ServicesRepository } from "./services.repository";
import { ServicesService } from "./services.service";

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity]), AuthModule],
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository],
  exports: [ServicesService],
})
export class ServicesModule {}
