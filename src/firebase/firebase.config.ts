// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUOdz7Ep_WhQOcB7vY65SxWqLUMFFH4rw",
  authDomain: "my-fashion-app-e387f.firebaseapp.com",
  projectId: "my-fashion-app-e387f",
  storageBucket: "my-fashion-app-e387f.firebasestorage.app",
  messagingSenderId: "579625894903",
  appId: "1:579625894903:web:4b35cdc62ed2c11f6ba4f2",
  measurementId: "G-44XRMXCS8V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
