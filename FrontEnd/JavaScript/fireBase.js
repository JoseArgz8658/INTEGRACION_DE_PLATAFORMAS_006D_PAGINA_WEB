// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjyeLCCkU0rr-0ywqaLX8uuYynu8Rm1yU",
  authDomain: "mangamania-proyect.firebaseapp.com",
  projectId: "mangamania-proyect",
  storageBucket: "mangamania-proyect.firebasestorage.app",
  messagingSenderId: "515105163385",
  appId: "1:515105163385:web:af51993421a29126fa2ca8",
  measurementId: "G-L9S5EEW5Y0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);