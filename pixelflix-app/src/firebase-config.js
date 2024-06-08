import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Project Credentials only. Authorization is setup in Firebase Security Rules
const firebaseConfig = {
    apiKey: "AIzaSyBql6Xhcjn2VVWAElGNpa5VthePaoptvaY",
    authDomain: "pixelflix-88050.firebaseapp.com",
    projectId: "pixelflix-88050",
    storageBucket: "pixelflix-88050.appspot.com",
    messagingSenderId: "956082995514",
    appId: "1:956082995514:web:9aab9cd23d35b1eeb09003",
    measurementId: "G-96PJLM185H"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);