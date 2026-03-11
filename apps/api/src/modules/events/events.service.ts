import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { EventsRepository } from "./events.repository";

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  create(dto: CreateEventDto) {
    return this.eventsRepository.create(dto);
  }
  findAll() {
    return this.eventsRepository.findAll();
  }
  findOne(id: string) {
    return this.eventsRepository.findOne(id);
  }
  update(id: string, dto: UpdateEventDto) {
    return this.eventsRepository.update(id, dto);
  }
  remove(id: string) {
    return this.eventsRepository.remove(id);
  }
}
