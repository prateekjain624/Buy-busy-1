// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbgcj-YiqGAohXvCAeBZqkcy-3k8EFcN0",
  authDomain: "busybuy-f3678.firebaseapp.com",
  projectId: "busybuy-f3678",
  storageBucket: "busybuy-f3678.firebasestorage.app",
  messagingSenderId: "730920660924",
  appId: "1:730920660924:web:064e7afd2782f8ee8805b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
