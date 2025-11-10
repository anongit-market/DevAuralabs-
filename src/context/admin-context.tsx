
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
    
    // An admin is identified SOLELY by their email address matching the hardcoded one.
    // This works because the firestore.rules also use this same logic.
    if (firebaseUser && firebaseUser.email === ADMIN_WEB_ID) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setIsLoading(false);

  }, [firebaseUser, isUserLoading]);


  const adminLogin = async (webId: string, key: string): Promise<boolean> => {
    // This function now performs two checks:
    // 1. Verifies the secret credentials (webId and key).
    // 2. Checks if the currently authenticated Firebase user has the admin email.
    // Both must be true for the login to succeed. This prevents a non-admin user
    // from seeing a "successful" login screen, only to be blocked by Firestore rules later.
    
    const credentialsAreValid = webId.toLowerCase() === ADMIN_WEB_ID && key === ADMIN_SECRET_KEY;
    
    // We also need to check the currently logged-in user.
    const userIsAuthenticatedAsAdmin = auth.currentUser && auth.currentUser.email === ADMIN_WEB_ID;

    if (credentialsAreValid && userIsAuthenticatedAsAdmin) {
        setIsAdmin(true);
        return true;
    }
    
    // If either check fails, the login is unsuccessful.
    return false;
  };

  const adminLogout = () => {
    // Since admin status is tied to the Firebase user, logging out the Firebase user
    // will automatically revoke admin status via the useEffect hook.
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
