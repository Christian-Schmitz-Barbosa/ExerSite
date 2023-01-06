import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAvvaYcx3QRqoMRvCZcGHy1mW6uHuKlPSw",
    authDomain: "exersite-a3155.firebaseapp.com",
    projectId: "exersite-a3155",
    storageBucket: "exersite-a3155.appspot.com",
    messagingSenderId: "1077581958897",
    appId: "1:1077581958897:web:077a2c76286ddf70c56350",
    measurementId: "G-1SN7QH4VY2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app)

export {db}