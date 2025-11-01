
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function ContactPage() {
  const { toast } = useToast();
  
  // In a real app, this would be fetched from the database
  const contactInfo = {
    email: 'support@devaura.labs',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Avenue, Silicon Valley, CA 94043'
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Message Sent!',
      description: "We'll get back to you shortly.",
    });
    form.reset();
  }

  return (
    <div className="container mx-auto max-w-5xl py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg text-muted-foreground mt-2">We'd love to hear from you. Here's how you can reach us.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-primary"/>
                        <a href={`mailto:${contactInfo.email}`} className="hover:underline">{contactInfo.email}</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-primary"/>
                        <span>{contactInfo.phone}</span>
                    </div>
                    <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-primary mt-1"/>
                        <span>{contactInfo.address}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
        <Card className="glass-card">
            <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} className="bg-background/50"/>
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
                                <Input placeholder="you@example.com" {...field} className="bg-background/50"/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Your Message</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Tell us how we can help..."
                                className="resize-none bg-background/50 min-h-[120px]"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full gradient-btn gradient-btn-1">
                            Send Message
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
