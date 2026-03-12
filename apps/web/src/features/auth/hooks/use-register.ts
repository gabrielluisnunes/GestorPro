import { useMutation } from "@tanstack/react-query";
import { register } from "../services/auth-api";
import type { RegisterInput } from "../types/auth.types";

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterInput) => register(data),
  });
}
