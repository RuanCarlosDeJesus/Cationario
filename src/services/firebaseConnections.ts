import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDnYudXPj6zczWqo0oIs9PrByInU4e2A84",
  authDomain: "cationario.firebaseapp.com",
  projectId: "cationario",
  storageBucket: "cationario.firebasestorage.app",
  messagingSenderId: "971978269239",
  appId: "1:971978269239:web:912413d6d0f1b19ccc95b2",
  measurementId: "G-6HDVT5SC94"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { app, auth, db, addDoc, collection,provider,signInWithPopup  };
