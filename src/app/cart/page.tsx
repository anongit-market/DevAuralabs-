
import { courses } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

const getPlaceholderImage = (id: string) => {
  return PlaceHolderImages.find((img) => img.id === id);
};

// Simulate items in the cart
const cartItems = [
  { ...courses[0], quantity: 1 },
  { ...courses[2], quantity: 1 },
];

const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const tax = subtotal * 0.1; // 10% tax
const total = subtotal + tax;

export default function CartPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold glowing-text">Shopping Cart</h1>
        <p className="text-lg text-muted-foreground mt-2">Review your items and proceed to checkout.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => {
            const placeholder = getPlaceholderImage(item.image);
            return (
              <Card key={item.id} className="glass-card flex items-center overflow-hidden">
                <div className="relative w-32 h-32 flex-shrink-0">
                  {placeholder && (
                    <Image
                      src={placeholder.imageUrl}
                      alt={item.title}
                      data-ai-hint={placeholder.imageHint}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardContent className="p-4 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.level}</p>
                    </div>
                    <p className="text-lg font-bold text-primary">${item.price}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                     <p className="text-sm">Qty: {item.quantity}</p>
                     <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="lg:col-span-1">
          <Card className="glass-card sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2 bg-white/10" />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </CardContent>
            <CardFooter>
              <Link href={`/checkout/${cartItems[0].id}`} className="w-full">
                  <Button size="lg" className="w-full gradient-btn gradient-btn-1">
                    Proceed to Checkout
                  </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
