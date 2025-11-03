
'use client';

import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Mail, GitPullRequest } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { cn } from "@/lib/utils";
import { RippleEffect } from '@/components/ui/ripple-effect';

type WebsiteRequest = {
    id: string;
    projectDetails: string;
    status: 'pending' | 'in progress' | 'completed' | 'rejected';
    requestDate: any;
};

const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    'in progress': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    completed: 'bg-green-500/20 text-green-400 border-green-500/50',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/50',
};

export default function MyRequestsPage() {
    const { user } = useUser();
    const firestore = useFirestore();
    
    const requestsQuery = useMemoFirebase(() => 
        firestore && user ? query(
            collection(firestore, 'website_requests'), 
            where('userId', '==', user.uid),
            orderBy('requestDate', 'desc')
        ) : null, 
        [firestore, user]
    );
    const { data: requests, isLoading } = useCollection<WebsiteRequest>(requestsQuery);

    return (
        <div className="container mx-auto max-w-5xl py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold">My Website Requests</h1>
                <p className="text-lg text-muted-foreground mt-2">Track the status of all your project submissions.</p>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                </div>
            ) : requests && requests.length > 0 ? (
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>My Submissions</CardTitle>
                        <CardDescription>Here is a list of all the website requests you've submitted.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project Details</TableHead>
                                    <TableHead>Requested</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requests.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell className="text-muted-foreground max-w-sm truncate" title={request.projectDetails}>
                                            {request.projectDetails}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {request.requestDate ? formatDistanceToNow(request.requestDate.toDate(), { addSuffix: true }) : 'N/A'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant="outline" className={cn("capitalize", statusColors[request.status])}>
                                                {request.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ) : (
                <div className="text-center py-16 glass-card rounded-2xl">
                    <GitPullRequest className="mx-auto h-24 w-24 text-muted-foreground" />
                    <h2 className="mt-6 text-2xl font-bold">No Requests Yet</h2>
                    <p className="mt-2 text-muted-foreground">You haven't submitted any website requests.</p>
                    <div className="mt-6">
                        <Link href="/services">
                            <Button className="gradient-btn gradient-btn-2 relative">
                                <Mail className="mr-2 h-4 w-4" />
                                Make a Request
                                <RippleEffect />
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
