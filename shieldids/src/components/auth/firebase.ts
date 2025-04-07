// firebase.ts  
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBgNgkpBU_RJ9suP2GIY3_Av-LNaUgk6yk",
    authDomain: "bestids-c28f7.firebaseapp.com",
    projectId: "bestids-c28f7",
    storageBucket: "bestids-c28f7.firebasestorage.app",
    messagingSenderId: "256635366937",
    appId: "1:256635366937:web:6a49523ac5935c1d42c488"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
