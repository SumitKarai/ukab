// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4wgln5Vbt_aafM-Y2ELvIfT_75zQ7hwQ",
  authDomain: "ukab-51967.firebaseapp.com",
  databaseURL: "https://ukab-51967-default-rtdb.firebaseio.com",
  projectId: "ukab-51967",
  storageBucket: "ukab-51967.firebasestorage.app",
  messagingSenderId: "832104540626",
  appId: "1:832104540626:web:05e083acd211d76bde400b",
  measurementId: "G-CGF1LNLSMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
console.log("Firebase and Firestore connected:", db);