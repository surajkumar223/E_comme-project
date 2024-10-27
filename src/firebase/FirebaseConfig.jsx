 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";  
// Your web app's Firebase configuration
import {getFirestore} from 'firebase/firestore'
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCFm1lrYvmRXCPOKeqvxuKB2Jw-7A4Y-KY",
  authDomain: "ecommerce-66ae3.firebaseapp.com",
  projectId: "ecommerce-66ae3",
  storageBucket: "ecommerce-66ae3.appspot.com",
  messagingSenderId: "299860680926",
  appId: "1:299860680926:web:e9cb9568e7d1961785e24f",
  databaseURL: "https://ecommerce-66ae3-default-rtdb.firebaseio.com"
};


const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }