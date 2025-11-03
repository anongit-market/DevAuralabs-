
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, TicketPercent, Copy } from 'lucide-react';
import Link from 'next/link';

export default function PromoCodesPage() {
  const { toast } = useToast();
  const [generatedCode, setGeneratedCode] = useState('');
  const [discount, setDiscount] = useState('10');

  const generateCode = () => {
    const code = `DEVAURA${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    setGeneratedCode(code);
  };

  const copyToClipboard = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: 'Copied!',
      description: `Promo code "${generatedCode}" copied to clipboard.`,
    });
  };

  const handleSaveCode = () => {
    if (!generatedCode) {
         toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Please generate a code first.',
        });
        return;
    }
    // In a real app, you'd save this to Firestore.
    console.log({
        code: generatedCode,
        discount: `${discount}%`,
    });
    toast({
        title: 'Promo Code Saved!',
        description: `Code "${generatedCode}" with a ${discount}% discount has been saved.`,
    });
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
            <TicketPercent /> Promo Codes
        </h1>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Promo Code Generator</CardTitle>
          <CardDescription>Create and manage discount codes for your customers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="discount-percentage">Discount Percentage</Label>
            <Input
              id="discount-percentage"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="e.g., 15"
              className="bg-background/50 max-w-xs"
            />
          </div>

          <Button onClick={generateCode}>Generate New Code</Button>

          {generatedCode && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <Label>Generated Code</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={generatedCode}
                  className="bg-background/50 font-mono text-lg"
                />
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleSaveCode} className="gradient-btn gradient-btn-1">
                Save Code
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
       <Card className="glass-card">
        <CardHeader>
          <CardTitle>Existing Promo Codes</CardTitle>
          <CardDescription>This is a placeholder for where existing codes would be listed and managed.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Feature coming soon.</p>
        </CardContent>
      </Card>

    </div>
  );
}
