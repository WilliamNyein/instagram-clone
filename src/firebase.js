import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX_ETowV6RCdl2jATGu7G5jbgvK3qX5hI",
  authDomain: "instragram-clone-1875f.firebaseapp.com",
  projectId: "instragram-clone-1875f",
  storageBucket: "instragram-clone-1875f.appspot.com",
  messagingSenderId: "96703481035",
  appId: "1:96703481035:web:8716c894fc9d282496474e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);