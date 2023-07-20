// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHb_NqfgQ6bI_lCrZ-bWXyTbEV3zL44j8",
  authDomain: "trailflix-nextjs.firebaseapp.com",
  projectId: "trailflix-nextjs",
  storageBucket: "trailflix-nextjs.appspot.com",
  messagingSenderId: "891370034581",
  appId: "1:891370034581:web:74b58d6210bd60f3f5929c",
};
// const firebaseConfig = {
//   apiKey: process.env.NEXT_JS_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_JS_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_JS_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_JS_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_JS_MESSAGING_SENDER,
//   appId: process.env.NEXT_JS_APP_ID,
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
