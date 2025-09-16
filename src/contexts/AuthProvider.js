// src/contexts/AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const snap = await getDoc(doc(db, 'users', u.uid));
        setUserData(snap.exists() ? snap.data() : null);
      } else {
        setUserData(null);
      }
      setInitializing(false);
    });

    return () => unsub();
  }, []);

  const signup = async (name, role, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;
    await setDoc(doc(db, 'users', uid), {
      name: name || '',
      email,
      role, // 'supplier' or 'distributor'
      createdAt: serverTimestamp()
    });
    return cred;
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, userData, initializing, signup, login, logout, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

