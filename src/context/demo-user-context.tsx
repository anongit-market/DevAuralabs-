
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAdmin } from './admin-context';

interface DemoUserContextType {
  isDemoMode: boolean;
  startDemoMode: () => void;
  endDemoMode: () => void;
}

const DemoUserContext = createContext<DemoUserContextType | undefined>(undefined);

const DEMO_USER_SESSION_KEY = 'dev-aura-demo-user-session';

export function DemoUserProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const { isAdmin, isLoading: isAdminLoading } = useAdmin();

  useEffect(() => {
    if (isAdminLoading) return; // Wait for admin state to be confirmed
    
    try {
      const sessionValue = sessionStorage.getItem(DEMO_USER_SESSION_KEY);
      // Only enable demo mode if the user is an admin
      if (sessionValue === 'true' && isAdmin) {
        setIsDemoMode(true);
      } else {
        // Clean up if not an admin
        sessionStorage.removeItem(DEMO_USER_SESSION_KEY);
        setIsDemoMode(false);
      }
    } catch (error) {
      console.warn('Could not read demo user session from sessionStorage:', error);
    }
  }, [isAdmin, isAdminLoading]);

  const startDemoMode = () => {
    if (!isAdmin) return; // Safety check
    try {
      sessionStorage.setItem(DEMO_USER_SESSION_KEY, 'true');
      setIsDemoMode(true);
    } catch (error) {
      console.error('Could not save demo user session to sessionStorage:', error);
    }
  };

  const endDemoMode = () => {
    try {
      sessionStorage.removeItem(DEMO_USER_SESSION_KEY);
      setIsDemoMode(false);
    } catch (error) {
      console.error('Could not remove demo user session from sessionStorage:', error);
    }
  };

  const value = { isDemoMode, startDemoMode, endDemoMode };

  return (
    <DemoUserContext.Provider value={value}>
      {children}
    </DemoUserContext.Provider>
  );
}

export function useDemoUser() {
  const context = useContext(DemoUserContext);
  if (context === undefined) {
    throw new Error('useDemoUser must be used within a DemoUserProvider');
  }
  return context;
}
