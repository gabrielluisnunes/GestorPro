import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsService } from "../clients/clients.service";
import { ContractsService } from "../contracts/contracts.service";
import { ServicesService } from "../services/services.service";
import { DocumentsRepository } from "./documents.repository";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UploadDocumentDto } from "./dto/upload-document.dto";

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly configService: ConfigService,
    private readonly clientsService: ClientsService,
    private readonly servicesService: ServicesService,
    private readonly contractsService: ContractsService,
  ) {}

  findAll(userId: string) {
    return this.documentsRepository.findAllByUser(userId);
  }

  async findOne(id: string, userId: string) {
    const document = await this.documentsRepository.findOneByUser(id, userId);
    if (!document) throw new NotFoundException("Documento não encontrado");
    return document;
  }

  create(dto: CreateDocumentDto) {
    return this.documentsRepository.create({ ...dto });
  }

  async createFromUploadedFile(
    userId: string,
    file: Express.Multer.File,
    dto: UploadDocumentDto,
  ) {
    if (!file) {
      throw new BadRequestException("Arquivo é obrigatório");
    }

    await this.clientsService.findOne(dto.client_id, userId);

    if (dto.service_id) {
      const service = await this.servicesService.findOne(
        dto.service_id,
        userId,
      );
      if (service.client_id !== dto.client_id) {
        throw new BadRequestException(
          "Serviço não pertence ao cliente selecionado",
        );
      }
    }

    if (dto.contract_id) {
      const contract = await this.contractsService.findOne(
        dto.contract_id,
        userId,
      );
      if (contract.client_id !== dto.client_id) {
        throw new BadRequestException(
          "Contrato não pertence ao cliente selecionado",
        );
      }
    }

    const publicBase =
      this.configService
        .get<string>("API_PUBLIC_URL", "http://localhost:3333")
        .replace(/\/$/, "") || "http://localhost:3333";

    const file_url = `${publicBase}/api/files/documents/${file.filename}`;

    return this.documentsRepository.create({
      file_url,
      filename: file.originalname,
      client_id: dto.client_id,
      service_id: dto.service_id,
      contract_id: dto.contract_id,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.documentsRepository.remove(id);
  }
}
