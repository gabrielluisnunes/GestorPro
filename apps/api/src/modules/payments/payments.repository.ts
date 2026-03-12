import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaymentEntity } from "../../database/entities/payment.entity";

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repo: Repository<PaymentEntity>,
  ) {}

  findAllByUser(userId: string): Promise<PaymentEntity[]> {
    return this.repo
      .createQueryBuilder("payment")
      .innerJoin("payment.contract", "contract")
      .innerJoin("contract.client", "client")
      .where("client.user_id = :userId", { userId })
      .orderBy("payment.due_date", "ASC")
      .getMany();
  }

  findOneByUser(id: string, userId: string): Promise<PaymentEntity | null> {
    return this.repo
      .createQueryBuilder("payment")
      .innerJoin("payment.contract", "contract")
      .innerJoin("contract.client", "client")
      .where("payment.id = :id AND client.user_id = :userId", { id, userId })
      .getOne();
  }

  create(data: Partial<PaymentEntity>): Promise<PaymentEntity> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(
    id: string,
    userId: string,
    data: Partial<PaymentEntity>,
  ): Promise<PaymentEntity | null> {
    await this.repo.update(id, data);
    return this.findOneByUser(id, userId);
  }
}
