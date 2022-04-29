import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app"
import { Auth, getAuth, connectAuthEmulator } from "firebase/auth"
import {
  Database,
  getDatabase,
  connectDatabaseEmulator,
} from "firebase/database"

import { isStringNotEmpty } from "utils/strings"

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const FIREBASE_AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
// const FIREBASE_DB_URL = process.env.NEXT_PUBLIC_FIREBASE_DB_URL
const FIREBASE_DB_URL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_EMULATOR
const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const FIREBASE_STORAGE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
const FIREBASE_MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
const FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID

// Your web app's Firebase configuration
const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DB_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// const config = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
// }

const initFirebase = (): {
  firebaseApp: FirebaseApp
  auth: Auth
  db: Database
} => {
  const emulatorAuthHost = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST
  const emulatorDbHost = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_EMULATOR_HOST

  if (!getApps().length) {
    initializeApp(config)
  }

  const firebaseApp = getApp()
  const auth = getAuth(firebaseApp)
  const db = getDatabase(firebaseApp)

  if (isStringNotEmpty(emulatorAuthHost)) {
    connectAuthEmulator(auth, emulatorAuthHost)
  }

  if (isStringNotEmpty(emulatorDbHost)) {
    const [host, port] = emulatorDbHost.split(":")
    connectDatabaseEmulator(db, host, parseInt(port))
  }

  return { firebaseApp, auth, db }
}

export { initFirebase }
