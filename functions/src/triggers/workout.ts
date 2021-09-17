import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
import {COLLECTION_WORKOUT} from "../utils/constants";
import {HttpsError} from "firebase-functions/v1/https";

export const onCreateWorkout = functions
    .runWith({timeoutSeconds: 540})
    .firestore.document(`${COLLECTION_WORKOUT}/{collectionId}`)
    .onCreate( async (snap, context) => {
      try {
        console.log("create result:", snap, context);
        return "ok";
      } catch (err) {
        console.log(JSON.stringify(err));
        throw new HttpsError("internal", JSON.stringify(err));
      }
    });

export const onUpdateWorkout = functions
    .runWith({timeoutSeconds: 540})
    .firestore.document(`${COLLECTION_WORKOUT}/{collectionId}`)
    .onUpdate(async (change, context) => {
      const collectionId = context.params.collectionId;
      const beforeWorkout = change.before.data();
      const afterWorkout = change.after.data();
      try {
        console.log(collectionId, beforeWorkout, afterWorkout);
        return afterWorkout;
      } catch (err) {
        console.log(JSON.stringify(err));
        throw new HttpsError("internal", JSON.stringify(err));
      }
    });

export const onDeleteWorkout =
    functions.firestore.document(`${COLLECTION_WORKOUT}/{collectionId}`)
        .onDelete(async (snap, context) => {
          try {
            return [];
          } catch (err) {
            console.log(JSON.stringify(err));
            throw new HttpsError("internal", JSON.stringify(err));
          }
        });
