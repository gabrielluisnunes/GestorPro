import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ClientEntity } from "./client.entity";
import { UserEntity } from "./user.entity";

export enum EventType {
  MEETING = "reuniao",
  DEADLINE = "prazo",
  HEARING = "audiencia",
  SESSION = "sessao",
  TASK = "tarefa",
}

@Entity("events")
export class EventEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: "enum", enum: EventType, default: EventType.TASK })
  type: EventType;

  @Column({ type: "date" })
  date: string;

  @Column({ nullable: true, length: 10 })
  time: string;

  @Column({ nullable: true, type: "text" })
  notes: string;

  @ManyToOne(() => UserEntity, (user) => user.events, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column()
  user_id: string;

  @ManyToOne(() => ClientEntity, (client) => client.events, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "client_id" })
  client: ClientEntity;

  @Column({ nullable: true })
  client_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
