import { Injectable } from "@nestjs/common";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";

@Injectable()
export class ContractsRepository {
  create(dto: CreateContractDto) {
    throw new Error("Not implemented");
  }
  findAll() {
    throw new Error("Not implemented");
  }
  findOne(id: string) {
    throw new Error("Not implemented");
  }
  update(id: string, dto: UpdateContractDto) {
    throw new Error("Not implemented");
  }
  remove(id: string) {
    throw new Error("Not implemented");
  }
}
