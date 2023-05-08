// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrhmTZLRmUU11gFixk6LIc-97MoreRcAU",
  authDomain: "maplestays-8976a.firebaseapp.com",
  projectId: "maplestays-8976a",
  storageBucket: "maplestays-8976a.appspot.com",
  messagingSenderId: "879769725504",
  appId: "1:879769725504:web:d30d7c4ee6f23fef790da5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);
export const db = getFirestore(app);