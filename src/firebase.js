import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBODnuhcZLd22d7aoWBSmeE74fzv_B1J6o",
  authDomain: "todo-list-263b1.firebaseapp.com",
  projectId: "todo-list-263b1",
  storageBucket: "todo-list-263b1.appspot.com",
  messagingSenderId: "905270761234",
  appId: "1:905270761234:web:8bd195e25f72e46ee505cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();