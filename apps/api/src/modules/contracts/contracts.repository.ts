import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContractEntity } from "../../database/entities/contract.entity";

@Injectable()
export class ContractsRepository {
  constructor(
    @InjectRepository(ContractEntity)
    private readonly repo: Repository<ContractEntity>,
  ) {}

  findAllByUser(userId: string): Promise<ContractEntity[]> {
    return this.repo
      .createQueryBuilder("contract")
      .innerJoin("contract.client", "client")
      .where("client.user_id = :userId", { userId })
      .orderBy("contract.created_at", "DESC")
      .getMany();
  }

  findOneByUser(id: string, userId: string): Promise<ContractEntity | null> {
    return this.repo
      .createQueryBuilder("contract")
      .innerJoin("contract.client", "client")
      .where("contract.id = :id AND client.user_id = :userId", { id, userId })
      .getOne();
  }

  create(data: Partial<ContractEntity>): Promise<ContractEntity> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(
    id: string,
    userId: string,
    data: Partial<ContractEntity>,
  ): Promise<ContractEntity | null> {
    await this.repo.update(id, data);
    return this.findOneByUser(id, userId);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
