import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBOmrTW90tu4xLinW8VyvIM-W1mwcuSW50",
  authDomain: "notion-6958d.firebaseapp.com",
  databaseURL: "https://notion-6958d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "notion-6958d",
  storageBucket: "notion-6958d.appspot.com",
  messagingSenderId: "455051119856",
  appId: "1:455051119856:web:04929fe173542421a84635"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//use auth for app 
const auth = getAuth(app);

auth.languageCode = "vn";

const db = getFirestore(app);
const GgProvider = new GoogleAuthProvider();
const storage = getStorage(app);

export {auth, db,storage ,GgProvider};