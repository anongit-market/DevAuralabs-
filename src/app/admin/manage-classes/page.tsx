
'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ManageClassForm from '@/components/manage-class-form';
import { Loader2 } from 'lucide-react';

export default function ManageClassesPage() {
    const firestore = useFirestore();

    const coursesQuery = useMemoFirebase(() => firestore ? collection(firestore, 'courses') : null, [firestore]);
    const { data: courses, isLoading: coursesLoading } = useCollection(coursesQuery);

    const skillsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'skills') : null, [firestore]);
    const { data: skills, isLoading: skillsLoading } = useCollection(skillsQuery);
    
    if (coursesLoading || skillsLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Manage Class URLs</CardTitle>
                        <CardDescription>Update the class details for each course and skill program.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {courses && courses.length > 0 && (
                                <>
                                    <h2 className="text-2xl font-bold mt-8 mb-4">Courses</h2>
                                    {courses.map(course => (
                                        <AccordionItem value={`course-${course.id}`} key={course.id}>
                                            <AccordionTrigger>{course.title}</AccordionTrigger>
                                            <AccordionContent>
                                                <ManageClassForm content={course} collectionName="courses" />
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </>
                            )}
                             {skills && skills.length > 0 && (
                                <>
                                    <h2 className="text-2xl font-bold mt-8 mb-4">Skill Programs</h2>
                                    {skills.map(skill => (
                                        <AccordionItem value={`skill-${skill.id}`} key={skill.id}>
                                            <AccordionTrigger>{skill.title}</AccordionTrigger>
                                            <AccordionContent>
                                                <ManageClassForm content={skill} collectionName="skills" />
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </>
                            )}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
