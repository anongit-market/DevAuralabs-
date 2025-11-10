
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_WEB_ID = 'mayanksharma4174@gmail.com';

export function AdminProvider({ children }: { children: ReactNode }) {
  const { user: firebaseUser, isUserLoading } = useUser();
  const auth = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isUserLoading) {
      setIsLoading(true);
      return;
    }
    
    // The single source of truth for admin status is the logged-in user's email.
    if (firebaseUser && firebaseUser.email === ADMIN_WEB_ID) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setIsLoading(false);

  }, [firebaseUser, isUserLoading]);


  const adminLogout = () => {
    // Logging out the Firebase user will automatically revoke admin status via the useEffect hook.
    signOut(auth);
    setIsAdmin(false);
  };

  // The login function is removed as it's no longer needed. 
  // Admin status is now determined automatically by the logged-in user's email.
  const value = { isAdmin, isLoading, logout: adminLogout };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
