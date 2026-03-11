import { Injectable } from "@nestjs/common";
import { UserEntity } from "../../database/entities/user.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findByEmail(email);
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.usersRepository.findById(id);
  }

  create(
    data: Pick<UserEntity, "name" | "email" | "password">,
  ): Promise<UserEntity> {
    return this.usersRepository.create(data);
  }
}
