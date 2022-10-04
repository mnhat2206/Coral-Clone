// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDnwsValyqPFBwNn9z-B_T9weE__u75rPM',
    authDomain: 'uploadfiles-25ef3.firebaseapp.com',
    projectId: 'uploadfiles-25ef3',
    storageBucket: 'uploadfiles-25ef3.appspot.com',
    messagingSenderId: '1069578434250',
    appId: '1:1069578434250:web:802fd6dc05b8fa21b96633',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
