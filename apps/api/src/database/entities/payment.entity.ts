import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ContractEntity } from "./contract.entity";

export enum PaymentStatus {
  PENDING = "pendente",
  PAID = "pago",
  OVERDUE = "atrasado",
}

@Entity("payments")
export class PaymentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column({ type: "date" })
  due_date: string;

  @Column({ nullable: true, type: "date" })
  payment_date: string;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @ManyToOne(() => ContractEntity, (contract) => contract.payments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "contract_id" })
  contract: ContractEntity;

  @Column()
  contract_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
