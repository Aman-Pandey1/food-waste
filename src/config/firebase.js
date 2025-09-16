// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDqwd064O4GywOWde_bJejpQbpCO65QvOA",
  authDomain: "comfoodwasteapp.firebaseapp.com",
  projectId: "comfoodwasteapp",
  storageBucket: "comfoodwasteapp.appspot.com",
  messagingSenderId: "994783822583",
  appId: "1:994783822583:android:1140a38ab7d9c33e3849f2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
