
'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import VantaBackground from '@/components/vanta-background';
import Footer from '@/components/layout/footer';
import { useAuth, useUser, initiateGoogleSignIn, initiateFacebookSignIn } from '@/firebase';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAdmin } from '@/context/admin-context';
import { User, Eye, EyeOff, KeyRound } from 'lucide-react';


const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.658-3.317-11.297-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C44.434,36.338,48,30.583,48,24C48,22.659,47.862,21.35,47.611,20.083z" />
    </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" fill="#1877F2" {...props}>
        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5.52 4.5 10.02 10 10.02s10-4.5 10-10.02C22 6.53 17.5 2.04 12 2.04zM16.5 12.87h-2.6v7.13h-3.3v-7.13h-1.6v-2.8h1.6v-1.9c0-1.55.94-2.8 2.6-2.8H16.5v2.8h-1.6c-.73 0-.87.35-.87.87v1.9h2.47l-.37 2.8z"/>
    </svg>
);

const adminFormSchema = z.object({
  webId: z.string().email({ message: 'Invalid Web ID format.' }),
  secretKey: z.string().min(1, 'Secret Key is required.'),
});


export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const view = searchParams.get('view');

  const auth = useAuth();
  const { user } = useUser();
  const { isAdmin, login: adminLogin } = useAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const adminForm = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: { webId: '', secretKey: '' },
  });

  useEffect(() => {
    if (isAdmin) {
        toast({ title: 'Admin Login Successful', description: 'Welcome, Administrator.' });
        router.push(next || '/admin');
    } else if (user) {
        toast({ title: 'Login Successful', description: 'Welcome back!' });
        router.push(next || '/');
    }
  }, [user, isAdmin, next, router, toast]);

  const onAdminSubmit = async (values: z.infer<typeof adminFormSchema>) => {
    setIsSubmitting(true);
    const success = await adminLogin(values.webId, values.secretKey);
    setIsSubmitting(false);

    if (!success) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid Web ID or Secret Key.',
      });
    }
  };
  
  const renderAdminLogin = () => (
     <div className="glass-card p-8 space-y-6">
        <div className="text-center space-y-2">
            <div className="flex justify-center">
                <KeyRound className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Private Access</h1>
            <p className="text-muted-foreground">Enter your credentials to continue.</p>
        </div>
        <Form {...adminForm}>
            <form onSubmit={adminForm.handleSubmit(onAdminSubmit)} className="space-y-4">
                <FormField
                    control={adminForm.control}
                    name="webId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Web ID</FormLabel>
                            <FormControl><Input placeholder="Enter your Web ID" {...field} className="bg-background/50" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={adminForm.control}
                    name="secretKey"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Secret Key</FormLabel>
                             <FormControl>
                                <div className="relative">
                                    <Input 
                                        type={showPassword ? 'text' : 'password'} 
                                        placeholder="Enter your secret key" 
                                        {...field} 
                                        className="bg-background/50 pr-10"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full gradient-btn gradient-btn-1" disabled={isSubmitting}>
                    {isSubmitting ? 'Connecting...' : 'Connect'}
                </Button>
            </form>
        </Form>
        <p className="text-center text-sm">
            <Link href="/login" className="text-muted-foreground hover:underline">
                Back to user login
            </Link>
        </p>
    </div>
  );

  const renderUserLogin = () => (
    <div className="glass-card p-8 space-y-6">
        <div className="text-center space-y-2">
            <div className="flex justify-center">
                <User className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-muted-foreground">Choose your provider to continue</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="w-full" onClick={() => initiateGoogleSignIn(auth)}>
                <GoogleIcon className="mr-2 h-5 w-5"/> Continue with Google
            </Button>
            <Button variant="outline" className="w-full" onClick={() => initiateFacebookSignIn(auth)}>
                <FacebookIcon className="mr-2 h-5 w-5"/> Continue with Facebook
            </Button>
        </div>

        <div className="relative my-4">
            <Separator />
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">OR</p>
        </div>

        <div className="text-center">
             <Link href="/login?view=admin">
                 <Button variant="link" className="text-primary">
                    Private Access (Authorized Only)
                 </Button>
             </Link>
        </div>

    </div>
  );

  return (
    <>
      <div className="relative flex min-h-[80vh] items-center justify-center px-4">
        <VantaBackground />
        <div className="relative z-10 w-full max-w-sm">
          {view === 'admin' ? renderAdminLogin() : renderUserLogin()}
        </div>
      </div>
      <Footer />
    </>
  );
}
