
import AddCoursePageForm from '@/components/add-course-page-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AddCoursePage() {
  return (
    <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Create a New Course</CardTitle>
                    <CardDescription>Fill out the details below to add a new course to the platform. Please be as detailed as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddCoursePageForm />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
