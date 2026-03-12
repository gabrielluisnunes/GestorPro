import { Injectable, NotFoundException } from "@nestjs/common";
import { DocumentsRepository } from "./documents.repository";
import { CreateDocumentDto } from "./dto/create-document.dto";

@Injectable()
export class DocumentsService {
  constructor(private readonly documentsRepository: DocumentsRepository) {}

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

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.documentsRepository.remove(id);
  }
}
