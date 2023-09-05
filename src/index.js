import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgCkPJTa7HCrN09joE8Xg7ERfp9LzI3XA",
  authDomain: "chatroom-bed16.firebaseapp.com",
  projectId: "chatroom-bed16",
  storageBucket: "chatroom-bed16.appspot.com",
  messagingSenderId: "487500691718",
  appId: "1:487500691718:web:8c73e6b6b98187803e4687",
  measurementId: "G-ENDYDD2MFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


