import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD9j2PXAt4EmZaTkQIYXUrxX_iRB3i1lbQ",
  authDomain: "harry-mart.firebaseapp.com",
  projectId: "harry-mart",
  storageBucket: "harry-mart.appspot.com",
  messagingSenderId: "214606740530",
  appId: "1:214606740530:web:16790fc4ae5ccf08b4902b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
