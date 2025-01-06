import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyASXS6yzaLmmEJDcHuYS918_Vs0U8xsuPA",
    authDomain: "projetofinalboer.firebaseapp.com",
    projectId: "projetofinalboer",
    storageBucket: "projetofinalboer.appspot.com",
    messagingSenderId: "753094337364",
    appId: "1:753094337364:web:24c6422622a8b3ffb95ec1",
    measurementId: "G-BGXQPGJ01X"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);