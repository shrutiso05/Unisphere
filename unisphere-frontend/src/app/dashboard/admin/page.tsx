'use client';

import { useAuth } from '@/hooks/useAuth';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  const { user } = useAuth();

  if (user?.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return <AdminDashboard />;
}