// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbC4_Lt0IMUu2OZcAytJlrC3SWDG1UwzA",
  authDomain: "money-matters-178c1.firebaseapp.com",
  projectId: "money-matters-178c1",
  storageBucket: "money-matters-178c1.appspot.com",
  messagingSenderId: "1079995398678",
  appId: "1:1079995398678:web:1648648c6588d3b3391337",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);