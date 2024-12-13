'use client';

import { Timeline } from '@/components/ui/timeline';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Application } from '@/types/application';

interface ApplicationStatusProps {
  application: Application;
}

export function ApplicationStatus({ application }: ApplicationStatusProps) {
  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    REVIEWING: 'bg-blue-100 text-blue-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  };

  const timelineEvents = [
    {
      title: 'Application Submitted',
      date: application.appliedDate,
      status: 'complete' as const,
    },
    {
      title: 'Document Verification',
      date: application.verificationDate,
      status: application.status === 'REVIEWING' ? 'current' : 'pending' as const,
    },
    {
      title: 'Review Process',
      date: application.reviewDate,
      status: 'pending' as const,
    },
    {
      title: 'Final Decision',
      date: null,
      status: 'pending' as const,
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Application Status</h2>
        <Badge className={statusColors[application.status]}>
          {application.status}
        </Badge>
      </div>

      <Timeline events={timelineEvents} />

      {application.reviewComments && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Review Comments
          </h3>
          <p className="text-sm bg-gray-50 p-3 rounded-md">
            {application.reviewComments}
          </p>
        </div>
      )}
    </Card>
  );
}