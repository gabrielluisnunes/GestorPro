import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { EventType } from "../../../database/entities/event.entity";

export { EventType };

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
