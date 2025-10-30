
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { AIPoweredCourseRecommendationsOutput } from '@/ai/flows/ai-powered-course-recommendations';

type Course = Exclude<AIPoweredCourseRecommendationsOutput['courses'], undefined>[0];

const getPlaceholderImage = (id: string) => {
  return PlaceHolderImages.find((img) => img.id === id);
};

export default function CourseChatCard({ course }: { course: Course }) {
  const placeholder = getPlaceholderImage(course.image);

  return (
    <div className="aura-glass-card p-3 max-w-sm">
      <div className="flex gap-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          {placeholder && (
            <Image
              src={placeholder.imageUrl}
              alt={course.title}
              data-ai-hint={placeholder.imageHint}
              fill
              className="object-cover rounded-md"
            />
          )}
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h4 className="text-sm font-bold text-white">{course.title}</h4>
            <p className="text-xs text-zinc-400">{course.level}</p>
          </div>
          <div className="flex justify-between items-end mt-1">
            <p className="text-sm font-bold text-primary">${course.price}</p>
            <Link href={`/courses/${course.id}`} passHref>
              <Button size="sm" className="h-7 px-2 text-xs">View</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
