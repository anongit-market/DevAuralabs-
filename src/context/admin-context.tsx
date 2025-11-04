
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser, useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, key: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_EMAIL = 'admindevaura22@gmail.com';
const ADMIN_SESSION_KEY = 'dev-aura-admin-session';

export function AdminProvider({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (!isUserLoading) {
      try {
        const sessionIsAdmin = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
        // Check if the currently logged-in user via Firebase is the admin
        const firebaseUserIsAdmin = user?.email === ADMIN_EMAIL;

        if (sessionIsAdmin || firebaseUserIsAdmin) {
          setIsAdmin(true);
          // Sync session storage if firebase user is admin but session is not set
          if (firebaseUserIsAdmin && !sessionIsAdmin) {
            sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
          }
        } else {
          setIsAdmin(false);
        }

      } catch (error) {
        setIsAdmin(false);
      }
    }
    setIsLoading(false);
  }, [isUserLoading, user]);

  const login = async (email: string, key: string): Promise<boolean> => {
    if (email !== ADMIN_EMAIL) {
      return false;
    }
    if (!auth) {
        console.error("Auth service not available");
        return false;
    }

    try {
      await signInWithEmailAndPassword(auth, email, key);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setIsAdmin(true);
      return true;
    } catch (error) {
        console.error("Admin login failed:", error);
        return false;
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      if (auth.currentUser?.email === ADMIN_EMAIL) {
          auth.signOut();
      }
    } catch (error) {
       console.error('Could not remove admin session from sessionStorage:', error);
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
