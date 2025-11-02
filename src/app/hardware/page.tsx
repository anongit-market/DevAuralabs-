
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu } from "lucide-react";
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/context/currency-context";
import { Skeleton } from "@/components/ui/skeleton";

export default function HardwarePage() {
  const firestore = useFirestore();
  const hardwareQuery = useMemoFirebase(() => firestore ? collection(firestore, 'hardware') : null, [firestore]);
  const { data: hardwareItems, isLoading } = useCollection(hardwareQuery);
  const { getConvertedPrice } = useCurrency();

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="text-center mb-12">
        <Cpu className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Hardware Store</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of high-performance hardware, from custom PCs to essential components.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          [1, 2, 3].map((item) => (
            <div key={item} className="glass-card p-4">
              <Skeleton className="aspect-video w-full rounded-lg mb-4 bg-muted/50" />
              <Skeleton className="h-6 w-3/4 mb-2 bg-muted/50" />
              <Skeleton className="h-4 w-full mb-4 bg-muted/50" />
              <Skeleton className="h-4 w-1/2 bg-muted/50" />
            </div>
          ))
        ) : hardwareItems && hardwareItems.length > 0 ? (
          hardwareItems.map((item) => (
            <Link href={`/hardware/${item.id}`} key={item.id} className="block">
              <div className="glass-card h-full flex flex-col p-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                  {item.imageUrls && item.imageUrls.length > 0 ? (
                    <Image
                      src={item.imageUrls[0]}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted/50 flex items-center justify-center rounded-lg">
                      <Cpu className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-muted-foreground text-sm flex-grow my-2">
                    {item.description.substring(0, 100)}{item.description.length > 100 ? '...' : ''}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                     <p className="text-lg font-bold text-primary">{getConvertedPrice(item.price)}</p>
                     <Button variant="outline">View Details</Button>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
           <div className="text-center col-span-full py-16">
            <p className="text-muted-foreground">No hardware products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
