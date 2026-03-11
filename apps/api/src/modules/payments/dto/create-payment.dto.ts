import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export enum PaymentStatus {
  PENDING = "pendente",
  PAID = "pago",
  OVERDUE = "atrasado",
}

export class CreatePaymentDto {
  @IsString()
  contract_id: string;

  @IsNumber()
  @IsPositive()
  value: number;

  @IsDateString()
  due_date: string;

  @IsOptional()
  @IsDateString()
  payment_date?: string;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;
}
