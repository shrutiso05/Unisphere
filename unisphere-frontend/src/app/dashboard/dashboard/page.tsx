'use client';

import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { RecentApplications } from '@/components/dashboard/RecentApplications'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.username}</h1>
      <DashboardStats />
      <RecentApplications />
    </div>
  )
}
