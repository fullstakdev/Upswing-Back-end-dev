import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";
import * as callables from "./callables";
import * as triggers from "./triggers";

admin.initializeApp();
export const db = admin.firestore();
export const FieldValue = admin.firestore.FieldValue;
export const FieldPath = admin.firestore.FieldPath;

const app = express();
/**
 * callable for workout
 */
app.post("/createWorkout", callables.createWorkout);
app.put("/updateWorkout", callables.updateWorkout);
app.delete("/deleteWorkout", callables.deleteWorkout);
app.post("/getWorkouts", callables.getWorkouts);

/**
 * callable for User
 */
app.post("/createUser", callables.createUser);
app.put("/updateUser", callables.updateUser);
app.delete("/deleteUser", callables.deleteUser);
app.post("/searchUsers", callables.searchUsers);

exports.onCreateWorkout = triggers.onCreateWorkout;
exports.api = functions.https.onRequest(app);
