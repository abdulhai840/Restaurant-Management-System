import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyA7nSFs-8jVdFdchUvbD_KtRoQXu3yZbF0",
  authDomain: "newproject-2eaf8.firebaseapp.com",
  databaseURL: "https://newproject-2eaf8-default-rtdb.firebaseio.com",
  projectId: "newproject-2eaf8",
  storageBucket: "newproject-2eaf8.appspot.com",
  messagingSenderId: "595901790762",
  appId: "1:595901790762:web:2e4041f59ba973be916153",
  // eslint-disable-next-line
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;