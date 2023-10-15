// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeskwG8NDFEZYB8jpYysCEDhe5Ty46M5E",
  authDomain: "todoapp-df634.firebaseapp.com",
  projectId: "todoapp-df634",
  storageBucket: "todoapp-df634.appspot.com",
  messagingSenderId: "741896909621",
  appId: "1:741896909621:web:8fa912c49c7b895fe3127c",
  measurementId: "G-M3F9T116ZQ",
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);
