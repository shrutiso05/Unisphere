'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDepartments, createDepartment } from '@/lib/api/departments';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/useToast';
import type { Department } from '@/types';

export function DepartmentManagement() {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: departments } = useQuery(['departments'], fetchDepartments);

  const { mutate } = useMutation(createDepartment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['departments']);
      setIsAddingNew(false);
      toast({
        title: 'Success',
        description: 'Department created successfully',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create department',
        variant: 'destructive',
      });
    },
  });

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Departments</h2>
        <Button onClick={() => setIsAddingNew(true)}>Add Department</Button>
      </div>

      <div className="space-y-4">
        {departments?.map((dept: Department) => (
          <div key={dept.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
            <div>
              <p className="font-medium">{dept.name}</p>
              <p className="text-sm text-gray-500">{dept.code}</p>
            </div>
            <p className={`text-sm ${dept.isActive ? 'text-green-600' : 'text-red-600'}`}>
              {dept.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}