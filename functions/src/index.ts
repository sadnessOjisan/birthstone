import * as functions from "firebase-functions";
import yaml from "./data.yaml";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export const helloWorld2 = functions.https.onRequest((request, response) => {
  console.log(yaml);
  response.send("Hello from Firebase!");
});
