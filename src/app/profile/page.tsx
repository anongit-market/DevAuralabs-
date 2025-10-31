
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Mail, Smartphone, Shield, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type UserData = {
  name: string;
  email: string;
  mobile?: string;
  role?: string;
};

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Add some mock data if not present
      setUserData({
        role: 'Student',
        mobile: '+91 00000-00000',
        ...parsedUser
      });
    }
  }, []);

  if (!isMounted) {
    return (
      <div className="container mx-auto max-w-xl py-12 px-4 flex justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!userData) {
    return (
        <div className="container mx-auto max-w-xl py-12 px-4 text-center">
            <h1 className="text-2xl font-bold">No User Data Found</h1>
            <p className="text-muted-foreground">Please log in to view your profile.</p>
        </div>
    )
  }

  return (
    <div className="container mx-auto max-w-xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Your Profile</h1>
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
           <div className="flex items-center gap-4">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-semibold">{userData.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
