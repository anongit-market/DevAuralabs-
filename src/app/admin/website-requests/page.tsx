
'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Mail, ArrowLeft, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

type WebsiteRequest = {
    id: string;
    name: string;
    email: string;
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

export default function WebsiteRequestsPage() {
    const firestore = useFirestore();
    const { toast } = useToast();
    
    const requestsQuery = useMemoFirebase(() => 
        firestore ? query(collection(firestore, 'website_requests'), orderBy('requestDate', 'desc')) : null, 
        [firestore]
    );
    const { data: requests, isLoading } = useCollection<WebsiteRequest>(requestsQuery);

    const handleStatusChange = async (id: string, status: WebsiteRequest['status']) => {
        if (!firestore) return;
        const requestRef = doc(firestore, 'website_requests', id);
        try {
            await updateDoc(requestRef, { status });
            toast({
                title: 'Status Updated',
                description: `The request status has been updated to "${status}".`,
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to update status.',
            });
        }
    };


    return (
        <div className="container mx-auto py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold flex items-center gap-2"><Mail /> Website Requests ({requests?.length || 0})</h1>
                </div>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>All Submissions</CardTitle>
                        <CardDescription>A list of all custom website requests submitted by users.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>From</TableHead>
                                    <TableHead>Requested</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24">
                                            <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                                        </TableCell>
                                    </TableRow>
                                ) : requests && requests.length > 0 ? (
                                    requests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>
                                                <div className="font-medium">{request.name}</div>
                                                <div className="text-sm text-muted-foreground">{request.email}</div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {request.requestDate ? formatDistanceToNow(request.requestDate.toDate(), { addSuffix: true }) : 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={cn("capitalize", statusColors[request.status])}>
                                                    {request.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground max-w-xs truncate" title={request.projectDetails}>
                                                {request.projectDetails}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                            Change Status <ChevronDown className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(request.id, 'pending')}>Pending</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(request.id, 'in progress')}>In Progress</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(request.id, 'completed')}>Completed</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(request.id, 'rejected')} className="text-destructive">Rejected</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24">
                                            No website requests found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

    