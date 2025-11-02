
'use client';

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
import { useFirestore } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, PlusCircle, Trash2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { RippleEffect } from './ui/ripple-effect';
import { Separator } from './ui/separator';

const formSchema = z.object({
  liveClassUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  liveClassTime: z.date().optional(),
  recordedVideoTitle: z.string().optional(),
  recordedVideoUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

type ManageClassFormProps = {
  content: {
    id: string;
    title: string;
    liveClassUrl?: string;
    liveClassTime?: { toDate: () => Date };
    recordedVideoTitle?: string;
    recordedVideoUrl?: string;
  };
  collectionName: 'courses' | 'skills';
};

export default function ManageClassForm({ content, collectionName }: ManageClassFormProps) {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      liveClassUrl: content.liveClassUrl || '',
      liveClassTime: content.liveClassTime?.toDate(),
      recordedVideoTitle: content.recordedVideoTitle || '',
      recordedVideoUrl: content.recordedVideoUrl || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore) return;
    const contentRef = doc(firestore, collectionName, content.id);
    try {
      await updateDoc(contentRef, {
        liveClassUrl: values.liveClassUrl,
        liveClassTime: values.liveClassTime,
        recordedVideoTitle: values.recordedVideoTitle,
        recordedVideoUrl: values.recordedVideoUrl,
      });
      toast({
        title: 'Success!',
        description: `Class details for "${content.title}" have been updated.`,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update class details.',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 bg-background/30 rounded-lg">
        <div>
          <h3 className="text-lg font-semibold mb-4">Live Class Details</h3>
          <div className="space-y-4">
             <FormField
                control={form.control}
                name="liveClassTime"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Live Class Start Time</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full pl-3 text-left font-normal bg-background/50",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP p")
                            ) : (
                                <span>Pick a date and time</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                        />
                        {/* Basic Time input - can be improved with a dedicated time picker component */}
                        <input
                            type="time"
                            className="w-full p-2 border-t"
                            value={field.value ? format(field.value, 'HH:mm') : ''}
                            onChange={(e) => {
                                const newTime = e.target.value.split(':');
                                const newDate = field.value ? new Date(field.value) : new Date();
                                newDate.setHours(parseInt(newTime[0]), parseInt(newTime[1]));
                                field.onChange(newDate);
                            }}
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="liveClassUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Class URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://meet.google.com/..." {...field} className="bg-background/50"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="my-6 bg-white/10" />

        <div>
            <h3 className="text-lg font-semibold mb-4">Recorded Videos</h3>
            <div className="space-y-4 p-4 border rounded-md border-white/10">
                <FormField
                control={form.control}
                name="recordedVideoTitle"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Recording Title</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Week 1 - Introduction to Networks" {...field} className="bg-background/50"/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="recordedVideoUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Recording URL</FormLabel>
                    <FormControl>
                        <Input placeholder="https://youtube.com/watch?v=..." {...field} className="bg-background/50"/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <Button variant="ghost" size="sm" className="mt-2 text-primary">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Another Recording
            </Button>
        </div>
        
        <Button type="submit" size="lg" className="w-full gradient-btn gradient-btn-1 relative">
            Save Class Details
            <RippleEffect />
        </Button>
      </form>
    </Form>
  );
}
