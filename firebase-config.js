// Import Firebase SDKs from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, setPersistence, browserLocalPersistence, sendPasswordResetEmail, sendEmailVerification, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, orderBy, query, limit, onSnapshot, doc, setDoc, updateDoc, increment, arrayUnion, where, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";

const firebaseConfig = {
    apiKey: "AIzaSyDTUZ2_UN-eO4JYKJeMeUTlH_LFhuSOa8o",
    authDomain: "zepol-2c1b5.firebaseapp.com",
    projectId: "zepol-2c1b5",
    storageBucket: "zepol-2c1b5.firebasestorage.app",
    messagingSenderId: "642066092712",
    appId: "1:642066092712:web:4c25bbb2aabf51df75e89d",
    measurementId: "G-8EBVL8FMD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// NOTE: Reverting explicit persistence as it causes hangs on unauthorized domains (192.168.x.x)
// Firebase defaults to 'local' anyway.
/*
setPersistence(auth, browserLocalPersistence)
    .then(() => console.log("💾 Firebase Persistence: LOCAL enabled"))
    .catch((error) => console.error("⚠️ Persistence Error:", error));
*/

const db = getFirestore(app);

// ── APP CHECK ────────────────────────────────────────────────────────────────
// Protects Firestore/Auth/APIs from bots and abuse (the kind of abuse that got
// this project suspended). To activate:
//   1. Firebase Console > App Check > register the web app with reCAPTCHA v3.
//   2. Paste the reCAPTCHA v3 SITE KEY below.
//   3. Enforce App Check on Firestore in the console.
const APPCHECK_SITE_KEY = "REPLACE_WITH_RECAPTCHA_V3_SITE_KEY";
if (APPCHECK_SITE_KEY && !APPCHECK_SITE_KEY.startsWith("REPLACE")) {
    try {
        initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(APPCHECK_SITE_KEY),
            isTokenAutoRefreshEnabled: true
        });
        console.log("🛡️ App Check enabled");
    } catch (e) {
        console.warn("⚠️ App Check init failed:", e?.message);
    }
} else {
    console.warn("⚠️ App Check NOT configured — set APPCHECK_SITE_KEY in firebase-config.js");
}

export { app, auth, db, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, collection, addDoc, getDocs, getDoc, orderBy, query, limit, onSnapshot, doc, setDoc, updateDoc, increment, arrayUnion, where, sendPasswordResetEmail, sendEmailVerification, deleteUser, reauthenticateWithCredential, EmailAuthProvider, deleteDoc };
