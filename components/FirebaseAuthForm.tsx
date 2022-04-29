// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
// import firebaseui from "firebaseui"
// import { useEffect } from "react"
// import { useRouter } from "next/router"
// import { initFirebase } from "client/firebase"
// import { useCreateSessionCookieMutation } from "generated/documentTypes"

// import { gql } from "@apollo/client"
// import {
//   EmailAuthProvider,
//   GoogleAuthProvider,
//   FacebookAuthProvider,
//   onAuthStateChanged,
// } from "firebase/auth"

// const { auth } = initFirebase()

// const firebaseAuthConfig: firebaseui.auth.Config = {
//   signInFlow: "popup",
//   signInOptions: [
//     {
//       provider: EmailAuthProvider.PROVIDER_ID,
//       requireDisplayName: false,
//     },
//     GoogleAuthProvider.PROVIDER_ID,
//     FacebookAuthProvider.PROVIDER_ID,
//   ],
//   signInSuccessUrl: "/",
//   credentialHelper: "none",
//   callbacks: {
//     // Avoid redirects after sign-in.
//     signInSuccessWithAuthResult: () => false,
//   },
// }

// gql`
//   mutation createSessionCookie($session: CreateSessionCookieInput!) {
//     sessionCookie: createSessionCookie(session: $session)
//   }
// `

// export const FirebaseAuth: React.FC = () => {
//   const router = useRouter()
//   const [createSessionCookie] = useCreateSessionCookieMutation()
//   // Listen to the Firebase Auth state and set the local state.
//   useEffect(() => {
//     const unregisterAuthObserver = onAuthStateChanged(auth, async (user) => {
//       const idToken = await user?.getIdToken()

//       if (idToken) {
//         await createSessionCookie({
//           variables: {
//             session: {
//               idToken,
//             },
//           },
//         })

//         router.push("/")
//       }
//     })
//     return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
//   }, [])

//   return (
//     <div>
//       <StyledFirebaseAuth uiConfig={firebaseAuthConfig} firebaseAuth={auth} />
//     </div>
//   )
// }
