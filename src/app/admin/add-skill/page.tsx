
import AddSkillPageForm from '@/components/add-skill-page-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AddSkillPage() {
  return (
    <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Create a New Skill Program</CardTitle>
                    <CardDescription>Fill out the details below to add a new skill development program to the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddSkillPageForm />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
