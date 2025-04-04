// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-finance-mate-ef697.firebaseapp.com",
  projectId: "my-finance-mate-ef697",
  storageBucket: "my-finance-mate-ef697.firebasestorage.app",
  messagingSenderId: "279035884602",
  appId: "1:279035884602:web:3cc095c8ad44f8b1173103"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);