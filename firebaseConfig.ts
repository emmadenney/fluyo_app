import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDNNGb3HBjDxzs5A3_ANqTKUwubsakw4Ik",
  authDomain: "fluyocodingtest.firebaseapp.com",
  projectId: "fluyocodingtest",
  storageBucket: "fluyocodingtest.appspot.com",
  messagingSenderId: "609641012060",
  appId: "1:609641012060:web:e6c261f2728c0b2cd1bf99",
  measurementId: "G-98G5S1E79C",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(firebaseApp);
