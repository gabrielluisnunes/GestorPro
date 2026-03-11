import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  async register(dto: RegisterDto) {
    // TODO: hash password, create user, return token
    throw new Error("Not implemented");
  }

  async login(dto: LoginDto) {
    // TODO: validate credentials, return JWT
    throw new Error("Not implemented");
  }
}
