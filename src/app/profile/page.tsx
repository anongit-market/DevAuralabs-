
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Mail, Smartphone } from 'lucide-react';

export default function ProfilePage() {
  
  // Static user data for display
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '+91 00000-00000',
  };

  return (
    <div className="container mx-auto max-w-xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold glowing-text">Your Profile</h1>
        <p className="text-lg text-muted-foreground mt-2">Manage your account details.</p>
      </div>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>Your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <User className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-semibold">{userData.name}</p>
            </div>
          </div>
            <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="font-semibold">{userData.email}</p>
            </div>
          </div>
            <div className="flex items-center gap-4">
            <Smartphone className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Mobile Number</p>
              <p className="font-semibold">{userData.mobile}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
