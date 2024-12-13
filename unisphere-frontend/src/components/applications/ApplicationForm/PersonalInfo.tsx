// src/components/applications/ApplicationForm/PersonalInfo.tsx
'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

export function PersonalInfo() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-lg font-semibold">Personal Information</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Full Name"
          {...register('fullName')}
          error={errors.fullName?.message}
        />
        
        <Input
          type="date"
          label="Date of Birth"
          {...register('dateOfBirth')}
          error={errors.dateOfBirth?.message}
        />
        
        <Select
          label="Gender"
          {...register('gender')}
          error={errors.gender?.message}
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </Select>
        
        <Input
          label="Nationality"
          {...register('nationality')}
          error={errors.nationality?.message}
        />
        
        <Input
          label="Aadhar Number"
          {...register('aadharNumber')}
          error={errors.aadharNumber?.message}
        />
        
        <Input
          type="email"
          label="Email"
          {...register('email')}
          error={errors.email?.message}
        />
        
        <Input
          label="Phone Number"
          {...register('phoneNumber')}
          error={errors.phoneNumber?.message}
        />
      </div>

      <div className="space-y-4">
        <Input
          label="Permanent Address"
          {...register('address')}
          error={errors.address?.message}
          multiline
          rows={3}
        />
        
        <div className="grid gap-6 md:grid-cols-3">
          <Input
            label="City"
            {...register('city')}
            error={errors.city?.message}
          />
          
          <Input
            label="State"
            {...register('state')}
            error={errors.state?.message}
          />
          
          <Input
            label="Pincode"
            {...register('pincode')}
            error={errors.pincode?.message}
          />
        </div>
      </div>
    </Card>
  );
}