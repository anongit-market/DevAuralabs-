
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

function createFirebaseApp() {
    if (getApps().length > 0) {
        return getApp();
    }
    
    // Check for App Hosting environment
    if (process.env.NEXT_PUBLIC_FIREBASE_APP_HOSTING_CONFIG) {
        try {
            const appHostingConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_APP_HOSTING_CONFIG);
            return initializeApp(appHostingConfig);
        } catch (e) {
             console.error("Failed to parse Firebase App Hosting config:", e);
        }
    }
    
    // Fallback to local config for development or other environments
    return initializeApp(firebaseConfig);
}


export function initializeFirebase() {
  const firebaseApp = createFirebaseApp();
  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
