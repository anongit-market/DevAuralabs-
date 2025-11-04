
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, DatabaseZap, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { seedInitialData } from '@/app/server-actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SeedDatabasePage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSeedData = async () => {
        setIsLoading(true);
        const result = await seedInitialData();
        setIsLoading(false);

        if (result.success) {
            toast({
                title: 'Database Seeding',
                description: result.message,
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: result.message,
            });
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <DatabaseZap /> Seed Database
                </h1>
            </div>

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Populate Initial Data</CardTitle>
                    <CardDescription>
                        Use this tool to populate your Firestore database with the initial data required for the application to function correctly, such as the showcase images.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <AlertTitle>Important Note</AlertTitle>
                        <AlertDescription>
                            This action will only add data if the collections are empty. It will not duplicate or overwrite existing data. It is safe to run this multiple times.
                        </AlertDescription>
                    </Alert>

                    <Button onClick={handleSeedData} className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Seeding...
                            </>
                        ) : (
                            'Seed Showcase Data'
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
