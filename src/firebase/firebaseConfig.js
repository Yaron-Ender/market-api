import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpZkjSGuopOxX2Vm71vmyzeqdL1mZXQzQ",
  authDomain: "market-api-6d238.firebaseapp.com",
  projectId: "market-api-6d238",
  storageBucket: "market-api-6d238.appspot.com",
  messagingSenderId: "623868651219",
  appId: "1:623868651219:web:6ce7633703d2b208771626",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage();
const timestamp = Timestamp.fromDate(new Date());
export { auth, db, storage, timestamp };

