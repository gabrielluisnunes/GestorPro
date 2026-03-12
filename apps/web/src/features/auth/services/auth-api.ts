import { apiClient } from "@/lib/api-client";
import type {
  AuthResponse,
  LoginInput,
  RegisterInput,
} from "../types/auth.types";

export async function register(data: RegisterInput): Promise<AuthResponse> {
  return apiClient.post("/auth/register", data).then((res) => res.data);
}

export async function login(data: LoginInput): Promise<AuthResponse> {
  return apiClient.post("/auth/login", data).then((res) => res.data);
}

export async function getMe(): Promise<AuthResponse["user"]> {
  return apiClient.get("/auth/me").then((res) => res.data);
}
