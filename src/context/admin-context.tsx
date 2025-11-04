
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser, useAuth } from '@/firebase';
import { signInAnonymously, signOut } from 'firebase/auth';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (webId: string, key: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_WEB_ID = 'admindevaura22@gmail.com';
const ADMIN_SECRET_KEY = 'devaura@7790';
const ADMIN_SESSION_KEY = 'dev-aura-admin-session';

export function AdminProvider({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = () => {
      setIsLoading(true);
      if (!isUserLoading) {
        try {
          const sessionIsAdmin = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
          if (sessionIsAdmin) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          setIsAdmin(false);
        }
      }
      setIsLoading(false);
    };
    checkAdminStatus();
  }, [isUserLoading]);

  const login = async (webId: string, key: string): Promise<boolean> => {
    if (webId === ADMIN_WEB_ID && key === ADMIN_SECRET_KEY) {
      try {
        // Sign in anonymously to get a valid auth object for security rules
        if (!auth.currentUser) {
          await signInAnonymously(auth);
        }
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
        setIsAdmin(true);
        return true;
      } catch (error) {
        console.error("Admin anonymous sign-in failed:", error);
        return false;
      }
    }
    return false;
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      // If the current user is an anonymous admin user, sign them out.
      if (auth.currentUser && auth.currentUser.isAnonymous) {
        signOut(auth);
      }
    } catch (error) {
       console.error('Could not remove admin session or sign out:', error);
    }
    setIsAdmin(false);
  };

  const value = { isAdmin, isLoading, login, logout };

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
