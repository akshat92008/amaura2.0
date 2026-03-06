import { create } from 'zustand';
import { User, BrandConfig } from '../types';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  init: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start as loading during init check

  init: () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      const { useStore } = await import('../store');
      
      if (firebaseUser) {
        // Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const user = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || userData.displayName,
            tenantID: userData.tenantID,
            role: userData.role,
            brandConfig: userData.brandConfig,
          };
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          // Sync with UI store
          useStore.getState().login(userData.role as any, userData.tenantID);
        } else {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
        useStore.getState().logout();
      }
    });
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Fetch profile
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || userData.displayName,
          tenantID: userData.tenantID,
          role: userData.role,
          brandConfig: userData.brandConfig,
        };

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        // Sync with UI store
        const { useStore } = await import('../store');
        useStore.getState().login(userData.role as any, userData.tenantID);
      }
    } catch (error) {
      console.error("Login failed:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await signOut(auth);
    const { useStore } = await import('../store');
    useStore.getState().logout();
    set({ user: null, isAuthenticated: false });
  }
}));
