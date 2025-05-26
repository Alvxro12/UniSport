import { auth, db } from "./firebase";
import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Registrar nuevo usuario + guardar en Firestore
export const registerUser = async (nombre, correo, contraseña) => {
const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
const user = userCredential.user;

await setDoc(doc(db, "usuarios", user.uid), {
nombre,
email: correo,
rol: "usuario",
});
return user;
};

// Login
export const loginUser = async (correo, contraseña) => {
const userCredential = await signInWithEmailAndPassword(auth, correo, contraseña);
return userCredential.user;
};

// Logout
export const logoutUser = async () => {
await signOut(auth);
};

// Obtener usuario actual en tiempo real
export const getCurrentUser = (callback) => {
return onAuthStateChanged(auth, callback);
};
