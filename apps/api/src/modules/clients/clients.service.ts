import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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

  async create(dto: CreateClientDto, userId: string) {
    const normalized = this.normalize(dto);
    await this.checkUniqueness(normalized, userId);
    return this.clientsRepository.create({ ...normalized, user_id: userId });
  }

  async update(id: string, dto: UpdateClientDto, userId: string) {
    await this.findOne(id, userId);
    const normalized = this.normalize(dto);
    await this.checkUniqueness(normalized, userId, id);
    return this.clientsRepository.update(id, userId, normalized);
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.clientsRepository.remove(id, userId);
  }

  private normalize(
    dto: CreateClientDto | UpdateClientDto,
  ): CreateClientDto | UpdateClientDto {
    const result = { ...dto };
    if (result.cpf_cnpj) result.cpf_cnpj = result.cpf_cnpj.replace(/\D/g, "");
    if (result.phone) result.phone = result.phone.replace(/\D/g, "");
    if (result.cep) result.cep = result.cep.replace(/\D/g, "");
    return result;
  }

  private async checkUniqueness(
    dto: CreateClientDto | UpdateClientDto,
    userId: string,
    excludeId?: string,
  ) {
    if (dto.cpf_cnpj) {
      const existing = await this.clientsRepository.findByCpfCnpj(
        dto.cpf_cnpj,
        userId,
      );
      if (existing && existing.id !== excludeId) {
        throw new ConflictException(
          "CPF/CNPJ já cadastrado para outro cliente",
        );
      }
    }
    if (dto.email) {
      const existing = await this.clientsRepository.findByEmail(
        dto.email,
        userId,
      );
      if (existing && existing.id !== excludeId) {
        throw new ConflictException("E-mail já cadastrado para outro cliente");
      }
    }
  }
}
