import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import type { AppProps /*, AppContext */ } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // setToken();
    // async function setToken() {
    //   try {
    //     const token = await firebaseCloudMessaging.init();
    //     if (token) {
    //       getMessage();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // function getMessage() {
    //   const messaging = getMessaging();
    //   console.log({ messaging });
    //   messaging.onMessage((message) => {
    //     const { title, body } = JSON.parse(message.data.notification);
    //     var options = {
    //       body,
    //     };
    //     self.registration.showNotification(title, options);
    //   });
    // }
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // ...
    });
  });

  return <Component {...pageProps} />;
}

export default MyApp;
