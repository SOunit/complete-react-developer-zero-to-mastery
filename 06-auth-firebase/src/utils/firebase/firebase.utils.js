// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAJwtANxZiUKmlA4IXBdL3OTRTGuggMQA",
  authDomain: "crown-clothing-db-da754.firebaseapp.com",
  projectId: "crown-clothing-db-da754",
  storageBucket: "crown-clothing-db-da754.appspot.com",
  messagingSenderId: "846632116890",
  appId: "1:846632116890:web:f821196dc8a0343761b523",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
