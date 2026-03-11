import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventsRepository {
  create(dto: CreateEventDto) {
    throw new Error("Not implemented");
  }
  findAll() {
    throw new Error("Not implemented");
  }
  findOne(id: string) {
    throw new Error("Not implemented");
  }
  update(id: string, dto: UpdateEventDto) {
    throw new Error("Not implemented");
  }
  remove(id: string) {
    throw new Error("Not implemented");
  }
}
