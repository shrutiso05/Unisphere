import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Course } from '@/types/course';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold">{course.name}</h3>
        <p className="mt-2 text-sm text-gray-600">{course.code}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Duration</span>
            <span className="text-sm">{course.durationYears} years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Seats</span>
            <span className="text-sm">{course.seatsAvailable}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Fee</span>
            <span className="text-sm">₹{course.admissionFee.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" asChild>
            <Link href={`/courses/${course.id}`}>View Details</Link>
          </Button>
          <Button asChild>
            <Link href={`/applications/new?courseId=${course.id}`}>Apply Now</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}