
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser, useAuth } from '@/firebase';
import { signInAnonymously } from 'firebase/auth';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (webId: string, key: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_WEB_ID = 'mayanksharma4174@gmail.com';
const ADMIN_SECRET_KEY = 'devaura@7790';
const ADMIN_SESSION_KEY = 'devaura-admin-session';

export function AdminProvider({ children }: { children: ReactNode }) {
  const { user: firebaseUser, isUserLoading } = useUser();
  const auth = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect now ONLY checks session storage on initial load.
    // It avoids conflicts with the firebaseUser state.
    try {
      const isAdminSession = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
      if (isAdminSession) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.warn('Could not read admin session from sessionStorage:', error);
    }
    setIsLoading(false);
  }, []);


  const adminLogin = async (webId: string, key: string): Promise<boolean> => {
    if (webId === ADMIN_WEB_ID && key === ADMIN_SECRET_KEY) {
      try {
        // Ensure there's an authenticated session for Firestore rules
        if (!auth.currentUser) {
            await signInAnonymously(auth);
        }
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
        setIsAdmin(true);
        return true;
      } catch (error) {
        console.error("Anonymous sign-in failed", error);
        return false;
      }
    }
    return false;
  };

  const adminLogout = () => {
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      // Note: We don't sign out the anonymous user here, 
      // as they might be a regular user who just tried the admin login.
      // The session key removal is sufficient to revoke admin UI access.
    } catch (error) {
      console.error('Could not remove admin session from sessionStorage:', error);
    }
    setIsAdmin(false);
  };

  const value = { isAdmin, isLoading, login: adminLogin, logout: adminLogout };

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
