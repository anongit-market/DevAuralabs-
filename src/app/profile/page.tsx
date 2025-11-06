
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useUser, useAuth, useFirestore, useMemoFirebase } from '@/firebase';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const profileFormSchema = z.object({
  displayName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phoneNumber: z.string().optional(),
  age: z.preprocess(
    (a) => (a ? parseInt(z.string().parse(a), 10) : undefined),
    z.number().positive({ message: 'Age must be a positive number.' }).optional()
  ),
  email: z.string().email(),
});

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();
  const firestore = useFirestore();
  const router = useRouter();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      age: undefined,
    },
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (user) {
      form.reset({
        displayName: user.displayName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        // Reset age from a potential Firestore doc if it exists
      });
    }
  }, [user, form]);
  
  useEffect(() => {
    const subscription = form.watch(() => setHasUnsavedChanges(true));
    return () => subscription.unsubscribe();
  }, [form]);


  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    if (!auth.currentUser || !firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'You are not logged in.' });
      return;
    }

    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: values.displayName,
      });

      // Update Firestore user document
      const userRef = doc(firestore, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
          displayName: values.displayName,
          email: values.email,
          phoneNumber: values.phoneNumber || null,
          age: values.age || null,
          role: 'student', // Assign a default role
      }, { merge: true }); // Merge to avoid overwriting other fields
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });

      setHasUnsavedChanges(false);
      router.push('/');

    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update your profile. Please try again.',
      });
    }
  }

  if (isUserLoading) {
    return (
      <div className="container mx-auto max-w-xl py-12 px-4 flex justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-xl py-12 px-4 text-center">
        <h1 className="text-2xl font-bold">No User Data Found</h1>
        <p className="text-muted-foreground">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-xl py-12 px-4">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>
            {form.getValues('displayName') ? 'Manage your account details.' : 'Please complete your profile to continue.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} className="bg-background/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} disabled className="bg-background/50 cursor-not-allowed" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} className="bg-background/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter your age" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : e.target.value)} className="bg-background/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full gradient-btn gradient-btn-1" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : 'Save Profile'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
