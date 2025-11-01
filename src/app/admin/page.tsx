
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, UserCog } from 'lucide-react';

export default function AdminPage() {
  
  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
       </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserCog /> Admin Profile</CardTitle>
            <CardDescription>Welcome, Administrator.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You have full access to manage courses, skills, and users.</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your platform content.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <Link href="/admin/add-course">
                <Button variant="outline" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Course
                </Button>
            </Link>

            <Link href="/admin/add-skill">
                <Button variant="outline" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Skill
                </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
