import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

export enum EventType {
  MEETING = "reunião",
  DEADLINE = "prazo",
  HEARING = "audiência",
  SESSION = "sessão",
  TASK = "tarefa",
}

export class CreateEventDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  client_id?: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsEnum(EventType)
  type?: EventType;

  @IsOptional()
  @IsString()
  notes?: string;
}
