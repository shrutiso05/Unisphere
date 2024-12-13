'use client';

import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CloudUpload, CheckCircle } from 'lucide-react';

const REQUIRED_DOCUMENTS = [
  {
    key: 'photo',
    label: 'Passport Size Photo',
    description: 'Upload recent passport size photograph',
    acceptedTypes: ['image/jpeg', 'image/png'],
  },
  {
    key: 'aadharCard',
    label: 'Aadhar Card',
    description: 'Upload scanned copy of Aadhar card',
    acceptedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
  },
  {
    key: 'tenthMarksheet',
    label: '10th Marksheet',
    description: 'Upload scanned copy of 10th marksheet',
    acceptedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
  },
  {
    key: 'twelfthMarksheet',
    label: '12th Marksheet',
    description: 'Upload scanned copy of 12th marksheet',
    acceptedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
  },
];

export function DocumentUpload() {
  const { register, setValue, watch } = useFormContext();
  const documents = watch();

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-lg font-semibold">Document Upload</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {REQUIRED_DOCUMENTS.map((doc) => (
          <DocumentUploader
            key={doc.key}
            {...doc}
            value={documents[doc.key]}
            onChange={(file) => setValue(doc.key, file)}
          />
        ))}
      </div>
    </Card>
  );
}

function DocumentUploader({
  label,
  description,
  acceptedTypes,
  value,
  onChange,
}: {
  label: string;
  description: string;
  acceptedTypes: string[];
  value: File | null;
  onChange: (file: File) => void;
}) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onChange(acceptedFiles[0]);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles: 1,
  });

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium mb-2">{label}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>

      {value ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-green-500" />
            <span className="text-sm">{value.name}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange(null)}
          >
            Remove
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <CloudUpload className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            {isDragActive
              ? 'Drop the file here'
              : 'Drag & drop a file here, or click to select'}
          </p>
        </div>
      )}
    </div>
  );
}