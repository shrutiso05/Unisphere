'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

export function AcademicInfo() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-lg font-semibold">Academic Information</h2>

      {/* 10th Details */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h3 className="text-md font-medium">10th Standard Details</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Input
            label="Board Name"
            {...register('tenthBoard')}
            error={errors.tenthBoard?.message}
          />
          
          <Input
            label="Year of Passing"
            type="number"
            {...register('tenthYearOfPassing')}
            error={errors.tenthYearOfPassing?.message}
          />
          
          <Input
            label="Percentage"
            type="number"
            step="0.01"
            {...register('tenthPercentage')}
            error={errors.tenthPercentage?.message}
          />
        </div>
      </div>

      {/* 12th Details */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h3 className="text-md font-medium">12th Standard Details</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Board Name"
            {...register('twelfthBoard')}
            error={errors.twelfthBoard?.message}
          />
          
          <Select
            label="Stream"
            {...register('twelfthStream')}
            error={errors.twelfthStream?.message}
          >
            <option value="">Select Stream</option>
            <option value="SCIENCE">Science</option>
            <option value="COMMERCE">Commerce</option>
            <option value="ARTS">Arts</option>
          </Select>
          
          <Input
            label="Year of Passing"
            type="number"
            {...register('twelfthYearOfPassing')}
            error={errors.twelfthYearOfPassing?.message}
          />
          
          <Input
            label="Percentage"
            type="number"
            step="0.01"
            {...register('twelfthPercentage')}
            error={errors.twelfthPercentage?.message}
          />
        </div>
      </div>
    </Card>
  );
}