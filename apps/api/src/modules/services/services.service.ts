import { Injectable } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { ServicesRepository } from "./services.repository";

@Injectable()
export class ServicesService {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  create(dto: CreateServiceDto) {
    return this.servicesRepository.create(dto);
  }

  findAll() {
    return this.servicesRepository.findAll();
  }

  findOne(id: string) {
    return this.servicesRepository.findOne(id);
  }

  update(id: string, dto: UpdateServiceDto) {
    return this.servicesRepository.update(id, dto);
  }

  remove(id: string) {
    return this.servicesRepository.remove(id);
  }
}
