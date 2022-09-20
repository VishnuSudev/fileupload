import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPeqpEDvbkNw2Y2rq_nXZV6InAhm0paSc",
    authDomain: "fileupload-7930f.firebaseapp.com",
    projectId: "fileupload-7930f",
    storageBucket: "fileupload-7930f.appspot.com",
    messagingSenderId: "1070959354321",
    appId: "1:1070959354321:web:40899d727da35dce2880f0"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

