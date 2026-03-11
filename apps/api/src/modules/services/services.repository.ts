import { Injectable } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";

@Injectable()
export class ServicesRepository {
  create(dto: CreateServiceDto) {
    throw new Error("Not implemented");
  }

  findAll() {
    throw new Error("Not implemented");
  }

  findOne(id: string) {
    throw new Error("Not implemented");
  }

  update(id: string, dto: UpdateServiceDto) {
    throw new Error("Not implemented");
  }

  remove(id: string) {
    throw new Error("Not implemented");
  }
}
