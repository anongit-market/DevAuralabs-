
'use client';

import { Button } from '@/components/ui/button';
import { useDemoUser } from '@/context/demo-user-context';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DemoUserFAB() {
  const { isDemoMode, endDemoMode } = useDemoUser();
  const router = useRouter();

  const handleExitDemo = () => {
    endDemoMode();
    router.push('/admin');
  };

  if (!isDemoMode) {
    return null;
  }

  return (
    <div className="fixed bottom-8 left-8 z-50 group">
      <Button
        variant="destructive"
        className="rounded-full h-16 w-auto px-6 shadow-lg"
        onClick={handleExitDemo}
      >
        <LogOut className="mr-2 h-5 w-5" />
        Exit Demo
      </Button>
    </div>
  );
}
