import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiNCG7Kz69PsFpOswTn3ra_KSsobuAmI0",
  authDomain: "rtk-blog-bebdd.firebaseapp.com",
  projectId: "rtk-blog-bebdd",
  storageBucket: "rtk-blog-bebdd.appspot.com",
  messagingSenderId: "1080734340667",
  appId: "1:1080734340667:web:cd08e7fddfbe6cd2d3ee1e"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const storage = getStorage(app);