import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyByM5BOEIhDcRfJpTlNpMDpvC5q-4k-TAA",
//   authDomain: "ebazaar-final.firebaseapp.com",
//   projectId: "ebazaar-final",
//   storageBucket: "ebazaar-final.appspot.com",
//   messagingSenderId: "193130422804",
//   appId: "1:193130422804:web:325f0d99a3089e1c80bd01"
// };
const firebaseConfig = {
  apiKey: "AIzaSyA84GmjKRLM1q-1Or64ZG_QZ_IPqqUGgdY",
  authDomain: "ebazaar-25c50.firebaseapp.com",
  projectId: "ebazaar-25c50",
  storageBucket: "ebazaar-25c50.appspot.com",
  messagingSenderId: "807565527170",
  appId: "1:807565527170:web:4b1079a761697ef1210c9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)


