import { Injectable } from "@nestjs/common";
import { ContractsRepository } from "./contracts.repository";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";

@Injectable()
export class ContractsService {
  constructor(private readonly contractsRepository: ContractsRepository) {}

  create(dto: CreateContractDto) {
    return this.contractsRepository.create(dto);
  }

  findAll() {
    return this.contractsRepository.findAll();
  }

  findOne(id: string) {
    return this.contractsRepository.findOne(id);
  }

  update(id: string, dto: UpdateContractDto) {
    return this.contractsRepository.update(id, dto);
  }

  remove(id: string) {
    return this.contractsRepository.remove(id);
  }
}
