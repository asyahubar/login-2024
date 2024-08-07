import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
const appId = import.meta.env.VITE_FIREBASE_APP_ID
const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID

export const firebaseApp = initializeApp({
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const usersRef = collection(db, 'users')