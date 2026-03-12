import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { PaymentsRepository } from "./payments.repository";

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  findAll(userId: string) {
    return this.paymentsRepository.findAllByUser(userId);
  }

  async findOne(id: string, userId: string) {
    const payment = await this.paymentsRepository.findOneByUser(id, userId);
    if (!payment) throw new NotFoundException("Pagamento não encontrado");
    return payment;
  }

  create(dto: CreatePaymentDto) {
    return this.paymentsRepository.create({ ...dto });
  }

  async update(id: string, dto: UpdatePaymentDto, userId: string) {
    await this.findOne(id, userId);
    return this.paymentsRepository.update(id, userId, dto);
  }
}
