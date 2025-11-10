
'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Package, ArrowLeft, ChevronDown } from 'lucide-react';
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
import { cn } from "@/lib/utils";
import { useCurrency } from '@/context/currency-context';

type Order = {
    id: string;
    userName: string;
    userEmail: string;
    productName: string;
    amount: number;
    currency: string;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    orderDate: any;
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        phone: string;
    }
};

const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    shipped: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    delivered: 'bg-green-500/20 text-green-400 border-green-500/50',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/50',
};

export default function OrdersPage() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const { getConvertedPrice } = useCurrency();
    
    const ordersQuery = useMemoFirebase(() => 
        firestore ? query(collection(firestore, 'orders'), orderBy('orderDate', 'desc')) : null, 
        [firestore]
    );
    const { data: orders, isLoading } = useCollection<Order>(ordersQuery);

    const handleStatusChange = async (id: string, status: Order['status']) => {
        if (!firestore) return;
        const orderRef = doc(firestore, 'orders', id);
        try {
            await updateDoc(orderRef, { status });
            toast({
                title: 'Status Updated',
                description: `The order status has been updated to "${status}".`,
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
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold flex items-center gap-2"><Package /> Hardware Orders ({orders?.length || 0})</h1>
                </div>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>All Orders</CardTitle>
                        <CardDescription>A list of all hardware product orders placed by customers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Shipping Address</TableHead>
                                    <TableHead>Ordered</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center h-24">
                                            <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                                        </TableCell>
                                    </TableRow>
                                ) : orders && orders.length > 0 ? (
                                    orders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>
                                                <div className="font-medium">{order.shippingAddress?.fullName || order.userName}</div>
                                                <div className="text-sm text-muted-foreground">{order.userEmail}</div>
                                            </TableCell>
                                            <TableCell className="font-medium">{order.productName}</TableCell>
                                            <TableCell>{getConvertedPrice(order.amount)}</TableCell>
                                            <TableCell className="text-muted-foreground max-w-xs text-xs">
                                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}
                                                <br/>
                                                Ph: {order.shippingAddress.phone}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {order.orderDate ? formatDistanceToNow(order.orderDate.toDate(), { addSuffix: true }) : 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={cn("capitalize", statusColors[order.status])}>
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                            Change Status <ChevronDown className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'pending')}>Pending</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'shipped')}>Shipped</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'delivered')}>Delivered</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'cancelled')} className="text-destructive">Cancelled</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center h-24">
                                            No orders found.
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
