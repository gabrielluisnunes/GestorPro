import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventEntity } from "../../database/entities/event.entity";

@Injectable()
export class EventsRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repo: Repository<EventEntity>,
  ) {}

  findAllByUser(userId: string): Promise<EventEntity[]> {
    return this.repo.find({
      where: { user_id: userId },
      order: { date: "ASC" },
    });
  }

  findOneByUser(id: string, userId: string): Promise<EventEntity | null> {
    return this.repo.findOne({ where: { id, user_id: userId } });
  }

  create(data: Partial<EventEntity>): Promise<EventEntity> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(
    id: string,
    userId: string,
    data: Partial<EventEntity>,
  ): Promise<EventEntity | null> {
    await this.repo.update({ id, user_id: userId }, data);
    return this.findOneByUser(id, userId);
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.repo.delete({ id, user_id: userId });
  }
}
