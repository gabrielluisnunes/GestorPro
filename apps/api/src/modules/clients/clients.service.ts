import { Injectable } from "@nestjs/common";
import { ClientsRepository } from "./clients.repository";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Injectable()
export class ClientsService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  create(dto: CreateClientDto) {
    return this.clientsRepository.create(dto);
  }

  findAll() {
    return this.clientsRepository.findAll();
  }

  findOne(id: string) {
    return this.clientsRepository.findOne(id);
  }

  update(id: string, dto: UpdateClientDto) {
    return this.clientsRepository.update(id, dto);
  }

  remove(id: string) {
    return this.clientsRepository.remove(id);
  }
}
