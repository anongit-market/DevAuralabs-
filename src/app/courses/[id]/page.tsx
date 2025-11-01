
import { notFound } from 'next/navigation';
import CourseDetailClient from './course-detail-client';
import { initializeFirebase } from '@/firebase/server';
import { doc, getDoc, Timestamp } from 'firebase/firestore';

async function getCourse(id: string) {
    const { firestore } = initializeFirebase();
    const courseRef = doc(firestore, 'courses', id);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
        return null;
    }
    
    const courseData = courseSnap.data();

    // Serialize Timestamp objects to strings
    const plainObject = { ...courseData, id: courseSnap.id };
    if (plainObject.startDate && plainObject.startDate instanceof Timestamp) {
        plainObject.startDate = plainObject.startDate.toDate().toISOString();
    }
    if (plainObject.endDate && plainObject.endDate instanceof Timestamp) {
        plainObject.endDate = plainObject.endDate.toDate().toISOString();
    }

    return plainObject;
}


export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);

  if (!course) {
    notFound();
  }

  // @ts-ignore
  return <CourseDetailClient course={course} />;
}
