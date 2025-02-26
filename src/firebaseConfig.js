// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJO9U13crpB0N0_Ua_3oXcj2YdoghA1yc",
  authDomain: "react-demo-c51db.firebaseapp.com",
  projectId: "react-demo-c51db",
  storageBucket: "react-demo-c51db.firebasestorage.app",
  messagingSenderId: "163636362883",
  appId: "1:163636362883:web:e3b4a97e8955e90d26e5b6",
  measurementId: "G-BVHB98NDZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);