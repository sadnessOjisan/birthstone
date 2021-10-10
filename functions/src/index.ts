import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { data } from "./data";

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const getData = functions.https.onRequest((request, response) => {
  response.json(data);
});

export const sendNotificationOfTodayGame = functions.pubsub
  .schedule("every 1 minutes")
  .onRun((context) => {
    const today = new Date();
    const todayIsBirthdayGames = data.filter((item) => {
      const publishDate = new Date(item.published);
      if (
        today.getMonth() === publishDate.getMonth() &&
        today.getDate() === publishDate.getDate()
      ) {
        return true;
      } else {
        return false;
      }
    });
    if (todayIsBirthdayGames.length === 0) {
      return null;
    }
    admin
      .firestore()
      .collection("tokens")
      .get()
      .then((snapshot) => {
        const tokens = snapshot.docs.map((d) => {
          return d.data().token as string;
        });
        const message = {
          data: {
            title: todayIsBirthdayGames[0].title,
          },
          tokens: tokens,
        };

        admin
          .messaging()
          .sendMulticast(message)
          .then((response) => {
            console.log(
              response.successCount + " messages were sent successfully"
            );
          });
      });

    return null;
  });
