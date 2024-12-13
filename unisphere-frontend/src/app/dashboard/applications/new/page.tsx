'use client';

import { ApplicationForm } from '@/components/applications/ApplicationForm';
import { Card } from '@/components/ui/card';

export default function NewApplicationPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">New Application</h1>
      <Card className="p-6">
        <ApplicationForm />
      </Card>
    </div>
  );
}