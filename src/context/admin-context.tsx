
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser } from '@/firebase';
import { signOut, getAuth } from 'firebase/auth';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_EMAIL = 'admindevaura22@gmail.com';
const ADMIN_SESSION_KEY = 'devaura-admin-session';

export function AdminProvider({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(isUserLoading);
    if (!isUserLoading) {
      const sessionIsAdmin = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
      if (sessionIsAdmin || (user && user.email === ADMIN_EMAIL)) {
        setIsAdmin(true);
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      } else {
        setIsAdmin(false);
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
      }
    }
  }, [user, isUserLoading]);

  const login = () => {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    setIsAdmin(true);
  };
  
  const logout = () => {
    const auth = getAuth();
    // Also sign out firebase user if logged in as admin
    if (user && user.email === ADMIN_EMAIL) {
        signOut(auth);
    }
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
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
