// // Import the functions you need from the SDKs you need
//   import { initializeApp } from "firebase/app";
//   import { getAnalytics } from "firebase/analytics";
//   import { getAuth, GoogleAuthProvider } from "firebase/auth";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyAN0vZ91kgs1ZoAtDnkvdAPTGmwya7xpeA",
//     authDomain: "smarthealth-43194.firebaseapp.com",
//     projectId: "smarthealth-43194",
//     storageBucket: "smarthealth-43194.firebasestorage.app",
//     messagingSenderId: "233989926666",
//     appId: "1:233989926666:web:db1b3df4b24d37289a14f3",
//     measurementId: "G-9LMLB0NDDH"
//   };


//     const app = initializeApp(firebaseConfig);
//     const auth = getAuth(app);
//     const provider = new GoogleAuthProvider();

//     export { auth, provider };
//     export default app;


import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Analytics (optional)
if (import.meta.env.MODE === "production") {
  getAnalytics(app);
}

export { auth, provider };
export default app;
