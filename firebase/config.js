import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCXkhueOPBw_sXm5TZST88JCUhF1ktjviA',
    authDomain: 'rnproject-5cce7.firebaseapp.com',
    projectId: 'rnproject-5cce7',
    storageBucket: 'rnproject-5cce7.appspot.com',
    messagingSenderId: '326338824541',
    appId: '1:326338824541:web:b4a739e55c5840f447c0b4',
    measurementId: 'G-SZDEVX738L',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
