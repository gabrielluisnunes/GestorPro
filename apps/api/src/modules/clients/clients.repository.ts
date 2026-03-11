import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClientEntity } from "../../database/entities/client.entity";

@Injectable()
export class ClientsRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly repo: Repository<ClientEntity>,
  ) {}

  findAllByUser(userId: string): Promise<ClientEntity[]> {
    return this.repo.find({
      where: { user_id: userId },
      order: { name: "ASC" },
    });
  }

  findOneByUser(id: string, userId: string): Promise<ClientEntity | null> {
    return this.repo.findOne({ where: { id, user_id: userId } });
  }

  create(data: Partial<ClientEntity>): Promise<ClientEntity> {
    const client = this.repo.create(data);
    return this.repo.save(client);
  }

  async update(
    id: string,
    userId: string,
    data: Partial<ClientEntity>,
  ): Promise<ClientEntity | null> {
    await this.repo.update({ id, user_id: userId }, data);
    return this.findOneByUser(id, userId);
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.repo.delete({ id, user_id: userId });
  }
}
