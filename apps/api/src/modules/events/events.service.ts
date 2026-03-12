import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { EventsRepository } from "./events.repository";

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  findAll(userId: string) {
    return this.eventsRepository.findAllByUser(userId);
  }

  async findOne(id: string, userId: string) {
    const event = await this.eventsRepository.findOneByUser(id, userId);
    if (!event) throw new NotFoundException("Evento não encontrado");
    return event;
  }

  create(dto: CreateEventDto, userId: string) {
    return this.eventsRepository.create({ ...dto, user_id: userId });
  }

  async update(id: string, dto: UpdateEventDto, userId: string) {
    await this.findOne(id, userId);
    return this.eventsRepository.update(id, userId, dto);
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.eventsRepository.remove(id, userId);
  }
}
