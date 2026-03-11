import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ClientEntity } from "./client.entity";
import { DocumentEntity } from "./document.entity";

export enum ServiceStatus {
  ACTIVE = "ativo",
  WAITING = "aguardando",
  FINISHED = "finalizado",
}

@Entity("services")
export class ServiceEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ type: "enum", enum: ServiceStatus, default: ServiceStatus.ACTIVE })
  status: ServiceStatus;

  @Column({ nullable: true, type: "date" })
  start_date: string;

  @Column({ nullable: true, type: "date" })
  end_date: string;

  @Column({ nullable: true, type: "text" })
  notes: string;

  @ManyToOne(() => ClientEntity, (client) => client.services, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "client_id" })
  client: ClientEntity;

  @Column()
  client_id: string;

  @OneToMany(() => DocumentEntity, (document) => document.service)
  documents: DocumentEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
