// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ⚠️ Reemplaza estos valores con los de tu consola Firebase
const firebaseConfig = {
apiKey: "AIzaSyBHt0UWAZQHPMTATSRHc8rHy-RZWVZM-Bc",
authDomain: "unisport-83845.firebaseapp.com ",
projectId: "unisport-83845",
storageBucket: "unisport-83845.firebasestorage.app",
messagingSenderId: "456118513244",
appId: "1:456118513244:web:1d588be5e66a690a8e4099"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
