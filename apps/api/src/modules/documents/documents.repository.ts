import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DocumentEntity } from "../../database/entities/document.entity";

@Injectable()
export class DocumentsRepository {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly repo: Repository<DocumentEntity>,
  ) {}

  findAllByUser(userId: string): Promise<DocumentEntity[]> {
    return this.repo
      .createQueryBuilder("doc")
      .leftJoin("doc.client", "client")
      .leftJoin("doc.service", "service")
      .leftJoin("service.client", "svcClient")
      .leftJoin("doc.contract", "contract")
      .leftJoin("contract.client", "ctClient")
      .where(
        "client.user_id = :userId OR svcClient.user_id = :userId OR ctClient.user_id = :userId",
        { userId },
      )
      .orderBy("doc.uploaded_at", "DESC")
      .getMany();
  }

  findOneByUser(id: string, userId: string): Promise<DocumentEntity | null> {
    return this.repo
      .createQueryBuilder("doc")
      .leftJoin("doc.client", "client")
      .leftJoin("doc.service", "service")
      .leftJoin("service.client", "svcClient")
      .leftJoin("doc.contract", "contract")
      .leftJoin("contract.client", "ctClient")
      .where("doc.id = :id", { id })
      .andWhere(
        "client.user_id = :userId OR svcClient.user_id = :userId OR ctClient.user_id = :userId",
        { userId },
      )
      .getOne();
  }

  create(data: Partial<DocumentEntity>): Promise<DocumentEntity> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
