import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyAR_7G-MfgD0rblzpcMDmq7qQ-byuJffME",
    authDomain: "sneakr-8d743.firebaseapp.com",
    projectId: "sneakr-8d743",
    storageBucket: "sneakr-8d743.firebasestorage.app",
    messagingSenderId: "1077636721693",
    appId: "1:1077636721693:web:200e623698992e6bbeaaf4",
    measurementId: "G-9DZT7Y5X50"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);