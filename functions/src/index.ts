import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";
import * as callables from "./callables";
import * as triggers from "./triggers";

admin.initializeApp();
export const db = admin.firestore();
// export const FieldValue = admin.firestore.FieldValue;
// export const FieldPath = admin.firestore.FieldPath;

const app = express();
/**
 * callable for workout
 */
app.post("/workout", callables.createWorkout);
app.put("/workout", callables.updateWorkout);
app.delete("/workout", callables.deleteWorkout);
app.get("/workouts/:workoutId", callables.getWorkout);
app.post("/workouts", callables.getWorkouts);

/**
 * callable for User
 */
app.post("/user", callables.createUser);
app.put("/user", callables.updateUser);
app.delete("/user", callables.deleteUser);
app.post("/users", callables.searchUsers);

exports.onCreateWorkout = triggers.onCreateWorkout;
exports.api = functions.https.onRequest(app);
