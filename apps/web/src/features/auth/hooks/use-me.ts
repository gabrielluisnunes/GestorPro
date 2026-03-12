import { useQuery } from '@tanstack/react-query';
import { getMe } from '../services/auth-api';

export function useMe() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMe,
    retry: false,
  });
}
