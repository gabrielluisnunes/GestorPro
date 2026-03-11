import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { PaymentsRepository } from "./payments.repository";

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  create(dto: CreatePaymentDto) {
    return this.paymentsRepository.create(dto);
  }
  findAll() {
    return this.paymentsRepository.findAll();
  }
  findOne(id: string) {
    return this.paymentsRepository.findOne(id);
  }
  update(id: string, dto: UpdatePaymentDto) {
    return this.paymentsRepository.update(id, dto);
  }
}
