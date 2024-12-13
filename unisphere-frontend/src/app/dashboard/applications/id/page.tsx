'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchApplicationById } from '@/lib/api/applications';
import { ApplicationStatus } from '@/components/applications/ApplicationStatus';
import { DocumentView } from '@/components/applications/DocumentView';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

export default function ApplicationDetailsPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const { data: application, isLoading } = useQuery(
    ['application', params.id],
    () => fetchApplicationById(params.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (!application) {
    return <div>Application not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Application Details</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <ApplicationDetails application={application} />
          <DocumentView documents={application.documents} />
        </div>
        <div>
          <ApplicationStatus application={application} />
        </div>
      </div>
    </div>
  );
}