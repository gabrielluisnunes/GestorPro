import { Injectable } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Injectable()
export class ClientsRepository {
  create(dto: CreateClientDto) {
    // TODO: insert into database
    throw new Error("Not implemented");
  }

  findAll() {
    // TODO: query all clients for authenticated user
    throw new Error("Not implemented");
  }

  findOne(id: string) {
    // TODO: query client by id
    throw new Error("Not implemented");
  }

  update(id: string, dto: UpdateClientDto) {
    // TODO: update client record
    throw new Error("Not implemented");
  }

  remove(id: string) {
    // TODO: delete client record
    throw new Error("Not implemented");
  }
}
