import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC-djc1mxRQTYf4B9C0pLH1iNuVEVrEovY',
  authDomain: 'home-harbor-app.firebaseapp.com',
  projectId: 'home-harbor-app',
  storageBucket: 'home-harbor-app.appspot.com',
  messagingSenderId: '653288228381',
  appId: '1:653288228381:web:a09c2a6839baee1324a8f4',
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export default db;
