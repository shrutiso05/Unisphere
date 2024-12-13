import api from './axios';
import type { Department, Course, User } from '@/types';

export async function fetchDashboardStats() {
  const response = await api.get('/admin/dashboard/stats');
  return response.data;
}

export async function fetchApplicationStats() {
  const response = await api.get('/admin/applications/stats');
  return response.data;
}

export async function manageUser(userId: number, action: 'activate' | 'deactivate') {
  const response = await api.patch(`/admin/users/${userId}/${action}`);
  return response.data;
}
