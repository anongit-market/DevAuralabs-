import { courses } from '@/lib/data';
import { notFound } from 'next/navigation';
import CourseDetailClient from './course-detail-client';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}
