import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClientEntity } from "./client.entity";
import { ContractEntity } from "./contract.entity";
import { ServiceEntity } from "./service.entity";

@Entity("documents")
export class DocumentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 500 })
  file_url: string;

  @Column({ nullable: true, length: 200 })
  filename: string;

  @ManyToOne(() => ClientEntity, (client) => client.documents, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "client_id" })
  client: ClientEntity;

  @Column({ nullable: true })
  client_id: string;

  @ManyToOne(() => ServiceEntity, (service) => service.documents, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "service_id" })
  service: ServiceEntity;

  @Column({ nullable: true })
  service_id: string;

  @ManyToOne(() => ContractEntity, (contract) => contract.documents, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "contract_id" })
  contract: ContractEntity;

  @Column({ nullable: true })
  contract_id: string;

  @CreateDateColumn()
  uploaded_at: Date;
}
