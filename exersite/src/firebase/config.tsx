// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvvaYcx3QRqoMRvCZcGHy1mW6uHuKlPSw",
  authDomain: "exersite-a3155.firebaseapp.com",
  projectId: "exersite-a3155",
  storageBucket: "exersite-a3155.appspot.com",
  messagingSenderId: "1077581958897",
  appId: "1:1077581958897:web:1765e9d6a82d8b8bc56350",
  measurementId: "G-NP4BQBQG5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {db, auth}
