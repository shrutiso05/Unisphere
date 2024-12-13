'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Steps } from './Steps';
import { PersonalInfo } from './PersonalInfo';
import { AcademicInfo } from './AcademicInfo';
import { DocumentUpload } from './DocumentUpload';
import { Review } from './Review';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';

const applicationSchema = z.object({
  // Personal Info
  fullName: z.string().min(3, 'Full name is required'),
  dateOfBirth: z.string(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  nationality: z.string(),
  aadharNumber: z.string().length(12, 'Invalid Aadhar number'),
  email: z.string().email(),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string().length(6, 'Invalid pincode'),
  
  // Academic Info
  tenthBoard: z.string(),
  tenthYearOfPassing: z.number(),
  tenthPercentage: z.number().min(0).max(100),
  twelfthBoard: z.string(),
  twelfthYearOfPassing: z.number(),
  twelfthPercentage: z.number().min(0).max(100),
  twelfthStream: z.string(),
  
  // Documents
  photo: z.any(),
  signature: z.any(),
  aadharCard: z.any(),
  tenthMarksheet: z.any(),
  twelfthMarksheet: z.any(),
  categoryDocument: z.any().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      const formData = new FormData();
      // Append form data
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });

      // Submit application
      // await submitApplication(formData);
      
      toast({
        title: 'Success',
        description: 'Application submitted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit application',
        variant: 'destructive',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        <Steps currentStep={step} />
        
        <div className="mt-8">
          {step === 1 && <PersonalInfo />}
          {step === 2 && <AcademicInfo />}
          {step === 3 && <DocumentUpload />}
          {step === 4 && <Review />}
        </div>

        <div className="flex justify-between">
          {step > 1 && (
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </Button>
          )}
          
          {step < 4 ? (
            <Button 
              type="button"
              onClick={() => setStep(step + 1)}
            >
              Next
            </Button>
          ) : (
            <Button type="submit">
              Submit Application
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}