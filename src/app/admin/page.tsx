
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, UserCog, Settings, List, Users, Cpu, Eye } from 'lucide-react';
import { useDemoUser } from '@/context/demo-user-context';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { startDemoMode } = useDemoUser();
  const router = useRouter();

  const handleStartDemo = () => {
    startDemoMode();
    router.push('/');
  };
  
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
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <Link href="/admin/add-hardware">
                <Button variant="outline" className="w-full">
                    <Cpu className="mr-2 h-4 w-4" /> Add Hardware
                </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><List /> Platform Content</CardTitle>
                <CardDescription>View, edit, or delete existing courses and skills.</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/admin/content">
                    <Button variant="outline">Manage Content</Button>
                </Link>
            </CardContent>
        </Card>
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users /> Manage Users</CardTitle>
                <CardDescription>View and manage all registered users on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/admin/users">
                    <Button variant="outline">View Users</Button>
                </Link>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Eye /> Demo User Mode</CardTitle>
                <CardDescription>Preview the site as a student with full content access.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="secondary" onClick={handleStartDemo}>Start Demo</Button>
            </CardContent>
        </Card>
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Settings /> General Settings</CardTitle>
                <CardDescription>Manage general website settings like theme and appearance.</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/admin/settings">
                    <Button variant="outline">Go to Settings</Button>
                </Link>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
