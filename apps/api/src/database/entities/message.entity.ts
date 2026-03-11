import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClientEntity } from "./client.entity";
import { UserEntity } from "./user.entity";

@Entity("messages")
export class MessageEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  content: string;

  @ManyToOne(() => ClientEntity, (client) => client.messages, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "client_id" })
  client: ClientEntity;

  @Column()
  client_id: string;

  @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;
}
