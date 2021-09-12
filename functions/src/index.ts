import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";
import * as callables from "./callables";

admin.initializeApp();
export const db = admin.firestore();
export const FieldValue = admin.firestore.FieldValue;
export const FieldPath = admin.firestore.FieldPath;

const app = express();

app.post("/createWorkout", callables.createWorkout);
app.post("/updateWorkout", callables.updateWorkout);
app.post("/deleteWorkout", callables.deleteWorkout);
app.get("/getWorkouts", callables.getWorkouts);

exports.api = functions.https.onRequest(app);
