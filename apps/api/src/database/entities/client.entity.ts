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
import { ContractEntity } from "./contract.entity";
import { DocumentEntity } from "./document.entity";
import { EventEntity } from "./event.entity";
import { MessageEntity } from "./message.entity";
import { ServiceEntity } from "./service.entity";
import { UserEntity } from "./user.entity";

@Entity("clients")
export class ClientEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ nullable: true, length: 20 })
  cpf_cnpj: string;

  @Column({ nullable: true, length: 30 })
  phone: string;

  @Column({ nullable: true, length: 200 })
  email: string;

  @Column({ nullable: true, type: "text" })
  address: string;

  @Column({ nullable: true, type: "text" })
  notes: string;

  @ManyToOne(() => UserEntity, (user) => user.clients, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column()
  user_id: string;

  @OneToMany(() => ServiceEntity, (service) => service.client)
  services: ServiceEntity[];

  @OneToMany(() => ContractEntity, (contract) => contract.client)
  contracts: ContractEntity[];

  @OneToMany(() => DocumentEntity, (document) => document.client)
  documents: DocumentEntity[];

  @OneToMany(() => EventEntity, (event) => event.client)
  events: EventEntity[];

  @OneToMany(() => MessageEntity, (message) => message.client)
  messages: MessageEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
