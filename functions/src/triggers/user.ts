import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
import {COLLECTION_USER} from "../utils/constant";
import {HttpsError} from "firebase-functions/v1/https";

export const onCreateUser = functions
    .runWith({timeoutSeconds: 540})
    .firestore.document(`${COLLECTION_USER}/{userId}`)
    .onCreate( async (snap, context) => {
      try {
        console.log("Please send email to User:", snap, context);
        return "ok";
      } catch (err) {
        console.log(JSON.stringify(err));
        throw new HttpsError("internal", JSON.stringify(err));
      }
    });