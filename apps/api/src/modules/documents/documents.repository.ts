import { Injectable } from "@nestjs/common";
import { CreateDocumentDto } from "./dto/create-document.dto";

@Injectable()
export class DocumentsRepository {
  create(dto: CreateDocumentDto) {
    throw new Error("Not implemented");
  }
  findAll() {
    throw new Error("Not implemented");
  }
  findOne(id: string) {
    throw new Error("Not implemented");
  }
  remove(id: string) {
    throw new Error("Not implemented");
  }
}
