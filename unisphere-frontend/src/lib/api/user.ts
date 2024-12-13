import api from './axios';
import type { User } from '@/types';

export async function fetchUsers(params?: {
  role?: string;
  search?: string;
  page?: number;
}) {
  const response = await api.get('/users', { params });
  return response.data;
}