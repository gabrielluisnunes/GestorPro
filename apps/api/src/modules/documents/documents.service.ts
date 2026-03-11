import { Injectable } from "@nestjs/common";
import { DocumentsRepository } from "./documents.repository";
import { CreateDocumentDto } from "./dto/create-document.dto";

@Injectable()
export class DocumentsService {
  constructor(private readonly documentsRepository: DocumentsRepository) {}

  create(dto: CreateDocumentDto) {
    return this.documentsRepository.create(dto);
  }
  findAll() {
    return this.documentsRepository.findAll();
  }
  findOne(id: string) {
    return this.documentsRepository.findOne(id);
  }
  remove(id: string) {
    return this.documentsRepository.remove(id);
  }
}
