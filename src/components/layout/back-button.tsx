
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className="glass-icon-btn"
    >
      <ChevronLeft className="h-5 w-5" />
      <span className="sr-only">Back</span>
    </Button>
  );
}
