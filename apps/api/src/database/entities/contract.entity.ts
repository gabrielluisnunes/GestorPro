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
import { PaymentEntity } from "./payment.entity";

@Entity("contracts")
export class ContractEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column({ nullable: true, type: "int" })
  installments: number;

  @Column({ nullable: true, type: "date" })
  start_date: string;

  @Column({ nullable: true, type: "date" })
  due_date: string;

  @Column({
    nullable: true,
    type: "decimal",
    precision: 5,
    scale: 2,
    default: 0,
  })
  interest_rate: number;

  @Column({ nullable: true, length: 500 })
  file_url: string;

  @ManyToOne(() => ClientEntity, (client) => client.contracts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "client_id" })
  client: ClientEntity;

  @Column()
  client_id: string;

  @OneToMany(() => PaymentEntity, (payment) => payment.contract)
  payments: PaymentEntity[];

  @OneToMany(() => DocumentEntity, (document) => document.contract)
  documents: DocumentEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
