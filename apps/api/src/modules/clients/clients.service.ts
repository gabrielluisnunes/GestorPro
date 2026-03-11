import { Injectable, NotFoundException } from "@nestjs/common";
import { ClientsRepository } from "./clients.repository";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Injectable()
export class ClientsService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  findAll(userId: string) {
    return this.clientsRepository.findAllByUser(userId);
  }

  async findOne(id: string, userId: string) {
    const client = await this.clientsRepository.findOneByUser(id, userId);
    if (!client) throw new NotFoundException("Cliente não encontrado");
    return client;
  }

  create(dto: CreateClientDto, userId: string) {
    return this.clientsRepository.create({ ...dto, user_id: userId });
  }

  async update(id: string, dto: UpdateClientDto, userId: string) {
    await this.findOne(id, userId);
    return this.clientsRepository.update(id, userId, dto);
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.clientsRepository.remove(id, userId);
  }
}
