import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

export enum ServiceStatus {
  ACTIVE = "ativo",
  WAITING = "aguardando",
  FINISHED = "finalizado",
}

export class CreateServiceDto {
  @IsString()
  client_id: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ServiceStatus)
  status?: ServiceStatus;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
