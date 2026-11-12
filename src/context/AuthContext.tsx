/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';

export interface CyrusUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isVipKey?: boolean;
  vipKey?: string;
}

export type NovexUser = CyrusUser; // Backwards compatibility
export type AnyUser = User | CyrusUser;

interface AuthContextType {
  user: AnyUser | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithKey: (key: string) => Promise<void>;
  loginWithEmail?: (email: string, pass: string) => Promise<void>;
  registerWithEmail?: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_KEY_STORAGE = 'cyrus_vip_session';
const LEGACY_KEY_STORAGE = 'novexa_vip_session';

function migrateSession(parsed: CyrusUser): CyrusUser {
  let changed = false;
  let key = parsed.vipKey || '';
  if (key.toUpperCase() === 'NOVEXA' || !key) {
    key = 'CYRUS3.0';
    changed = true;
  }
  let disp = parsed.displayName || '';
  if (disp.toUpperCase().includes('NOVEXA') || !disp) {
    disp = `VIP-${key}`;
    changed = true;
  }
  let email = parsed.email || '';
  if (email.includes('novexa')) {
    email = `${key.toLowerCase().replace(/[^a-z0-9]/g, '')}@cyrus.vip`;
    changed = true;
  }
  let photo = parsed.photoURL || '';
  if (!photo || photo.includes('cyrus_logo.png') || photo.includes('novex')) {
    photo = '/assets/cyrus_dp.png';
    changed = true;
  }

  const updated: CyrusUser = {
    ...parsed,
    vipKey: key,
    displayName: disp,
    email,
    photoURL: photo,
  };
  if (changed) {
    localStorage.setItem(LOCAL_KEY_STORAGE, JSON.stringify(updated));
  }
  return updated;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AnyUser | null>(() => {
    try {
      const savedKeySession = localStorage.getItem(LOCAL_KEY_STORAGE) || localStorage.getItem(LEGACY_KEY_STORAGE);
      if (savedKeySession) {
        const parsed = JSON.parse(savedKeySession) as CyrusUser;
        return migrateSession(parsed);
      }
    } catch {
      // ignore
    }
    return null;
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Sync user profile to Firestore (for Google / Firebase users)
  const syncUserProfile = async (firebaseUser: User) => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'CYRUS Player',
          photoURL: firebaseUser.photoURL || '/assets/cyrus_dp.png',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${firebaseUser.uid}`);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.removeItem(LOCAL_KEY_STORAGE);
        localStorage.removeItem(LEGACY_KEY_STORAGE);
        syncUserProfile(currentUser).catch(() => {});
      } else {
        // If not logged in via Firebase, check if user had a VIP key session
        try {
          const savedKeySession = localStorage.getItem(LOCAL_KEY_STORAGE) || localStorage.getItem(LEGACY_KEY_STORAGE);
          if (savedKeySession) {
            const parsed = JSON.parse(savedKeySession);
            setUser(migrateSession(parsed));
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      if (cred.user) {
        localStorage.removeItem(LOCAL_KEY_STORAGE);
        localStorage.removeItem(LEGACY_KEY_STORAGE);
        setUser(cred.user);
        await syncUserProfile(cred.user);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error('Google Sign-In Error:', errorMsg);
      throw err;
    }
  };

  const loginWithKey = async (rawKey: string) => {
    let cleaned = rawKey.trim();
    if (!cleaned || cleaned.length < 3) {
      throw new Error('Please enter a valid CYRUS VIP Key (e.g. CYRUS3.0).');
    }

    if (cleaned.toUpperCase() === 'NOVEXA') {
      cleaned = 'CYRUS3.0';
    }

    const keyUser: CyrusUser = {
      uid: `vip_${cleaned.toLowerCase().replace(/[^a-z0-9_-]/g, '')}`,
      email: `${cleaned.toLowerCase().replace(/[^a-z0-9]/g, '')}@cyrus.vip`,
      displayName: `VIP-${cleaned.toUpperCase()}`,
      photoURL: '/assets/cyrus_dp.png',
      isVipKey: true,
      vipKey: cleaned.toUpperCase(),
    };

    localStorage.setItem(LOCAL_KEY_STORAGE, JSON.stringify(keyUser));
    localStorage.removeItem(LEGACY_KEY_STORAGE);
    setUser(keyUser);
  };

  const logout = async () => {
    localStorage.removeItem(LOCAL_KEY_STORAGE);
    localStorage.removeItem(LEGACY_KEY_STORAGE);
    setUser(null);
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        loginWithKey,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
