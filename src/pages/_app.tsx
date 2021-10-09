import { getMessaging, onMessage, getToken } from "firebase/messaging";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { useEffect } from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import { getApp, initializeApp } from "@firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseApp =
  // getApp() ??
  initializeApp({
    apiKey: "AIzaSyARcJXJRq2heclH1DoMu3zqkzwb0vuA4iw",
    authDomain: "birthstone-b73d7.firebaseapp.com",
    projectId: "birthstone-b73d7",
    storageBucket: "birthstone-b73d7.appspot.com",
    messagingSenderId: "55130399678",
    appId: "1:55130399678:web:3c9a4711499f16fdfd0fef",
    measurementId: "G-FQH4QWQ628",
  });
const db = getFirestore(firebaseApp);

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth).then((user) => {
      const uid = user.user.uid;
      getToken(messaging, {
        vapidKey:
          "BL6X4jOgnYPvW-mnbBWsJc_sV9D55AAKAXbP83P9KQqyNSX6gupSPugyVLeFdF1GXB1vQKLbAsQOHWka__mGwEE",
      })
        .then((currentToken) => {
          console.log("my token is ", currentToken);
          if (currentToken) {
            setDoc(doc(db, "tokens", uid), {
              token: currentToken,
            });
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((e) => {
          console.error(e);
        });
    });
    const messaging = getMessaging(firebaseApp);

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // ...
    });
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
