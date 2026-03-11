import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../../database/entities/user.entity";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.repo
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", { email })
      .getOne();
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.repo.findOneBy({ id });
  }

  create(
    data: Pick<UserEntity, "name" | "email" | "password">,
  ): Promise<UserEntity> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }
}
