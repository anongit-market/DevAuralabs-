
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (webId: string, key: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_WEB_ID = 'mayanksharma4174@gmail.com';
const ADMIN_SECRET_KEY = 'devaura@7790';

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


  const adminLogin = async (webId: string, key: string): Promise<boolean> => {
    // This function now ONLY verifies the secret credentials.
    // It does NOT perform sign-in. It simply confirms the user knows the secret.
    // The actual admin privileges are granted by the `useEffect` hook above,
    // which depends on the user being logged in with the correct Firebase account.
    const credentialsAreValid = webId.toLowerCase() === ADMIN_WEB_ID && key === ADMIN_SECRET_KEY;
    
    if (credentialsAreValid) {
        // We also check if the currently authenticated user in Firebase has the correct email.
        // This ensures the user is logged into the correct Firebase account BEFORE accessing admin areas.
        const userIsAuthenticatedAsAdmin = auth.currentUser && auth.currentUser.email === ADMIN_WEB_ID;
        return userIsAuthenticatedAsAdmin;
    }
    
    return false;
  };

  const adminLogout = () => {
    // Logging out the Firebase user will automatically revoke admin status via the useEffect hook.
    signOut(auth);
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
