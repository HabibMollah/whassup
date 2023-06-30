import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJx-5TqnncmvLLXGosYH15o9kXgv9vk54",
  authDomain: "whassup-62183.firebaseapp.com",
  projectId: "whassup-62183",
  storageBucket: "whassup-62183.appspot.com",
  messagingSenderId: "540575445302",
  appId: "1:540575445302:web:adc81969ccfc7be6f24397",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const db = getFirestore(app);
