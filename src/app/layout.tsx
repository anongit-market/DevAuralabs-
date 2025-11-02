
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/navbar';
import { FirebaseClientProvider } from '@/firebase';
import { AdminProvider } from '@/context/admin-context';
import { CurrencyProvider } from '@/context/currency-context';
import { DemoUserProvider } from '@/context/demo-user-context';
import DemoUserFAB from '@/components/demo-user-fab';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`dark`}>
      <head>
        <title>DevAura Labs</title>
        <meta name="description" content="Master. Build. Secure — All in One Platform." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased bg-background text-foreground">
        <FirebaseClientProvider>
          <AdminProvider>
            <DemoUserProvider>
              <CurrencyProvider>
                <div className="relative z-10 flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1">{children}</main>
                </div>
                <DemoUserFAB />
                <Toaster />
              </CurrencyProvider>
            </DemoUserProvider>
          </AdminProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
