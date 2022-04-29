// Import the functions you need from the SDKs you need
import * as firebaseSdk from "firebase-admin"
import { getEnvString } from "../utils/env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const FIREBASE_API_KEY = getEnvString("NEXT_PUBLIC_FIREBASE_API_KEY")
const FIREBASE_AUTH_DOMAIN = getEnvString("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN")
const FIREBASE_DB_URL = getEnvString("NEXT_PUBLIC_FIREBASE_DB_URL")
const FIREBASE_PROJECT_ID = getEnvString("NEXT_PUBLIC_FIREBASE_PROJECT_ID")
const FIREBASE_STORAGE_BUCKET = getEnvString("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET")
const FIREBASE_MESSAGING_SENDER_ID = getEnvString("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID")
const FIREBASE_APP_ID = getEnvString("NEXT_PUBLIC_FIREBASE_APP_ID")

// const DATABASE_URL = getEnvString("FIREBASE_RTD_URL")
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const CLIENT_EMAIL = getEnvString("FIREBASE_CLIENT_EMAIL")
const PRIVATE_KEY = getEnvString("FIREBASE_PRIVATE_KEY")
// const STORAGE_BUCKET = getEnvString("FIREBASE_STORAGE_BUCKET")
// const EMULATOR_AUTH_HOST = getEnvString("FIREBASE_AUTH_EMULATOR_HOST")

if (firebaseSdk.apps.length === 0) {
  firebaseSdk.initializeApp({
    credential: firebaseSdk.credential.cert({
      projectId: PROJECT_ID,
      privateKey: PRIVATE_KEY,
      clientEmail: CLIENT_EMAIL,
    }),
    databaseURL: FIREBASE_DB_URL,
    // storageBucket: FIREBASE_STORAGE_BUCKET,
  })
}

console.log('server')
var db = firebaseSdk.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});


// export async function getDocByPath<T>(
//   path: string,
//   collection: string,
// ): Promise<DBResult<T> | undefined> {
//   const dbQuery = await firebaseSdk
//     .app()
//     .database()
//     .ref(collection)
//     .child(path)
//     .once("value")

//   const dbVal = dbQuery.val()

//   if (!dbVal) {
//     return undefined
//   }

//   if (!!dbVal && !!dbQuery.key) {
//     return {
//       id: dbQuery.key,
//       dbVal: dbVal as T,
//     }
//   }
// } 