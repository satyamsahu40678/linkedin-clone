import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnJ3G6LOmLsP0emmaL2uyuRQ7GHj76vvc",
    authDomain: "linkedin-clone-88d7b.firebaseapp.com",
    projectId: "linkedin-clone-88d7b",
    storageBucket: "linkedin-clone-88d7b.appspot.com",
    messagingSenderId: "534770807407",
    appId: "1:534770807407:web:7f2b45b379b1dee66d539a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

// Initialize Firebase Auth
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

// Initialize Firebase Storage
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
