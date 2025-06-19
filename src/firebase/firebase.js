// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCgmizYpLghdIQXG5ChaUoc95Najjn0My8",
  authDomain: "login-2d7d1.firebaseapp.com",
  projectId: "login-2d7d1",
  storageBucket: "login-2d7d1.firebasestorage.app",
  messagingSenderId: "390831004506",
  appId: "1:390831004506:web:2b567169371aaaa3573163",
  measurementId: "G-1RKJNZWN24",
};

// ✅ Initialize app FIRST
const app = initializeApp(firebaseConfig);

// ✅ Now use the app
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

// ✅ Export for usage in other files
export { auth, provider };
