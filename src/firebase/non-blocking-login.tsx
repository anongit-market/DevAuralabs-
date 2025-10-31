
'use client';
import {
  Auth, // Import Auth type for type hinting
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

/** Initiate Google sign-in (non-blocking). */
export function initiateGoogleSignIn(authInstance: Auth): void {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authInstance, provider);
}

/** Initiate Facebook sign-in (non-blocking). */
export function initiateFacebookSignIn(authInstance: Auth): void {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authInstance, provider);
}
