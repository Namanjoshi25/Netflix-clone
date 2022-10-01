
import { initializeApp } from 'firebase/app';
import { getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBDAgnlhU_9hIot7p4BZuQXSR-unJWFoZE",
  authDomain: "netflix-clone-e0df2.firebaseapp.com",
  projectId: "netflix-clone-e0df2",
  storageBucket: "netflix-clone-e0df2.appspot.com",
  messagingSenderId: "759256269194",
  appId: "1:759256269194:web:4f603ba4182f9517644873",
  measurementId: "G-H9HCB7MMMD"
};

// Initialize Firebase
export const app=initializeApp(firebaseConfig);
export const storage = getStorage(app);


