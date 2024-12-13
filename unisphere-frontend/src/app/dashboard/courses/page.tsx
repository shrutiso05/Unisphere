use client';

import { CourseList } from '@/components/courses/CourseList';
import { CourseFilters } from '@/components/courses/CourseFilters';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function CoursesPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Courses</h1>
        {user?.role === 'ADMIN' && (
          <Button asChild>
            <Link href="/courses/new">Add Course</Link>
          </Button>
        )}
      </div>
      
      <CourseFilters />
      <CourseList />
    </div>
  );
}
