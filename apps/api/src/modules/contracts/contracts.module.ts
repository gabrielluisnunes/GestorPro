import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContractEntity } from "../../database/entities/contract.entity";
import { AuthModule } from "../auth/auth.module";
import { ContractsController } from "./contracts.controller";
import { ContractsRepository } from "./contracts.repository";
import { ContractsService } from "./contracts.service";

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity]), AuthModule],
  controllers: [ContractsController],
  providers: [ContractsService, ContractsRepository],
  exports: [ContractsService],
})
export class ContractsModule {}
