import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Injectable()
export class PaymentsRepository {
  create(dto: CreatePaymentDto) {
    throw new Error("Not implemented");
  }
  findAll() {
    throw new Error("Not implemented");
  }
  findOne(id: string) {
    throw new Error("Not implemented");
  }
  update(id: string, dto: UpdatePaymentDto) {
    throw new Error("Not implemented");
  }
}
