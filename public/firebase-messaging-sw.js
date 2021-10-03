importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyARcJXJRq2heclH1DoMu3zqkzwb0vuA4iw",
  authDomain: "birthstone-b73d7.firebaseapp.com",
  projectId: "birthstone-b73d7",
  storageBucket: "birthstone-b73d7.appspot.com",
  messagingSenderId: "55130399678",
  appId: "1:55130399678:web:3c9a4711499f16fdfd0fef",
  measurementId: "G-FQH4QWQ628",
});

firebase.messaging();

//background notifications will be received here
firebase.messaging().setBackgroundMessageHandler((payload) => {
  const { title, body } = JSON.parse(payload.data.notification);
  var options = {
    body,
    icon: "/icon-192x192.png",
  };
  registration.showNotification(title, options);
});
