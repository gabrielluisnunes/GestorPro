import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ServiceEntity } from "../../database/entities/service.entity";

@Injectable()
export class ServicesRepository {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly repo: Repository<ServiceEntity>,
  ) {}

  findAllByUser(userId: string): Promise<ServiceEntity[]> {
    return this.repo
      .createQueryBuilder("service")
      .innerJoin("service.client", "client")
      .where("client.user_id = :userId", { userId })
      .orderBy("service.created_at", "DESC")
      .getMany();
  }

  findOneByUser(id: string, userId: string): Promise<ServiceEntity | null> {
    return this.repo
      .createQueryBuilder("service")
      .innerJoin("service.client", "client")
      .where("service.id = :id AND client.user_id = :userId", { id, userId })
      .getOne();
  }

  create(data: Partial<ServiceEntity>): Promise<ServiceEntity> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(
    id: string,
    userId: string,
    data: Partial<ServiceEntity>,
  ): Promise<ServiceEntity | null> {
    await this.repo.update(id, data);
    return this.findOneByUser(id, userId);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
