import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAk3Kak_zUab3zLN72o_64ci63SWxuPOq4",
  authDomain: "invoice-app-de9e6.firebaseapp.com",
  projectId: "invoice-app-de9e6",
  storageBucket: "invoice-app-de9e6.firebasestorage.app",
  messagingSenderId: "807386184125",
  appId: "1:807386184125:web:1349736647b72278937ad4",
  measurementId: "G-TLMNJRXEJY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
