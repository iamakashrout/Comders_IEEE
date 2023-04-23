import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDu02J3MlPd9FT84Ui8_qpZWAXcWb-ovgQ",
    authDomain: "auth-84409.firebaseapp.com",
    projectId: "auth-84409",
    storageBucket: "auth-84409.appspot.com",
    messagingSenderId: "877971644707",
    appId: "1:877971644707:web:4d2db42469499274e8ac96"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig)

// services
const auth = getAuth(app)
const db = getFirestore(app)


export { app, auth, db }