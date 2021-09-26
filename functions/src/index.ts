import * as functions from "firebase-functions";
import { data } from "./data";

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
