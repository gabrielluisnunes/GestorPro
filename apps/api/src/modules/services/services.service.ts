import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { ServicesRepository } from "./services.repository";

@Injectable()
export class ServicesService {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  findAll(userId: string) {
    return this.servicesRepository.findAllByUser(userId);
  }

  async findOne(id: string, userId: string) {
    const service = await this.servicesRepository.findOneByUser(id, userId);
    if (!service) throw new NotFoundException("Serviço não encontrado");
    return service;
  }

  create(dto: CreateServiceDto) {
    return this.servicesRepository.create({ ...dto });
  }

  async update(id: string, dto: UpdateServiceDto, userId: string) {
    await this.findOne(id, userId);
    return this.servicesRepository.update(id, userId, dto);
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.servicesRepository.remove(id);
  }

  /** Usado pelo agendador: finaliza serviços cuja data de término já passou. */
  finalizeExpiredServices(): Promise<number> {
    return this.servicesRepository.markFinishedWhereEndDatePassed();
  }
}
