import { getMessaging } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
import { initializeApp } from "@firebase/app";

initializeApp({
  apiKey: "AIzaSyARcJXJRq2heclH1DoMu3zqkzwb0vuA4iw",
  authDomain: "birthstone-b73d7.firebaseapp.com",
  projectId: "birthstone-b73d7",
  storageBucket: "birthstone-b73d7.appspot.com",
  messagingSenderId: "55130399678",
  appId: "1:55130399678:web:3c9a4711499f16fdfd0fef",
  measurementId: "G-FQH4QWQ628",
});

const messaging = getMessaging();
onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/icon-192x192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
