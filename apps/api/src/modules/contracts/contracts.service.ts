import { Injectable, NotFoundException } from "@nestjs/common";
import { ContractsRepository } from "./contracts.repository";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";

@Injectable()
export class ContractsService {
  constructor(private readonly contractsRepository: ContractsRepository) {}

  findAll(userId: string) {
    return this.contractsRepository.findAllByUser(userId);
  }

  async findOne(id: string, userId: string) {
    const contract = await this.contractsRepository.findOneByUser(id, userId);
    if (!contract) throw new NotFoundException("Contrato não encontrado");
    return contract;
  }

  create(dto: CreateContractDto) {
    return this.contractsRepository.create({ ...dto });
  }

  async update(id: string, dto: UpdateContractDto, userId: string) {
    await this.findOne(id, userId);
    return this.contractsRepository.update(id, userId, dto);
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.contractsRepository.remove(id);
  }
}
