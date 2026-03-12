import { useMutation } from '@tanstack/react-query';
import { login } from '../services/auth-api';
import type { LoginInput } from '../types/auth.types';

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginInput) => login(data),
  });
}
