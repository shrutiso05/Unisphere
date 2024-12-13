'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchApplicationStats } from '@/lib/api/admin';
import { Card } from '@/components/ui/card';
import { Charts } from '@/components/ui/charts';

export function ApplicationsOverview() {
  const { data: stats } = useQuery(['applicationStats'], fetchApplicationStats);

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Applications Overview</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <p className="text-sm text-gray-500">Total Applications</p>
          <p className="text-2xl font-bold">{stats?.total || 0}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Pending Review</p>
          <p className="text-2xl font-bold">{stats?.pending || 0}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-bold">{stats?.approved || 0}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-2xl font-bold">{stats?.rejected || 0}</p>
        </div>
      </div>
      <div className="mt-6 h-64">
        <Charts.Bar data={stats?.trendsData || []} />
      </div>
    </Card>
  );
}