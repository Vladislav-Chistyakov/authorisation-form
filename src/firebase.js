// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKhpKoeGaB_x6dkbXOqe9JVAPxiq6WCSs",
    authDomain: "fir-c3640.firebaseapp.com",
    projectId: "fir-c3640",
    storageBucket: "fir-c3640.firebasestorage.app",
    messagingSenderId: "109587410951",
    appId: "1:109587410951:web:dc9755e5c88881a2c9faa2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
