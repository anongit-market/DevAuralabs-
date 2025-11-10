
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser, useAuth } from '@/firebase';

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
    setIsLoading(true);
    try {
      const isAdminSession = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
      if (isAdminSession) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.warn('Could not read admin session from sessionStorage:', error);
    }
    setIsLoading(false);
  }, []);


  const adminLogin = async (webId: string, key: string): Promise<boolean> => {
    if (webId.toLowerCase() === ADMIN_WEB_ID && key === ADMIN_SECRET_KEY) {
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
        setIsAdmin(true);
        // Simulate a login for the security rules
        if (auth.currentUser?.email !== webId) {
            await auth.signOut().catch(() => {}); // Sign out any existing different user
            // We don't need to actually sign in, the rules now depend on the session
        }
        return true;
      } catch (error) {
        console.error("Admin session setup failed", error);
        return false;
      }
    }
    return false;
  };

  const adminLogout = () => {
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (error) {
      console.error('Could not remove admin session from sessionStorage:', error);
    }
    setIsAdmin(false);
    // We don't sign out the Firebase user, as they might be a regular user
    // or the admin might just be "de-escalating" privileges.
  };

  const value = { isAdmin, isLoading: isLoading || isUserLoading, login: adminLogin, logout: adminLogout };

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
