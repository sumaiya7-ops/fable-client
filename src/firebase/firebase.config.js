import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIC6LXjkq9kkzttRqNrLxIbAbO3qgqTlU",
  authDomain: "fable-dfa18.firebaseapp.com",
  projectId: "fable-dfa18",
  storageBucket: "fable-dfa18.firebasestorage.app",
  messagingSenderId: "861269182251",
  appId: "1:861269182251:web:5a2a3a89a20a5631e5676e",
  measurementId: "G-Q94PYTXZGT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);