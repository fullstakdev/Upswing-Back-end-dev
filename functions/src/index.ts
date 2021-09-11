
import * as admin from "firebase-admin";

admin.initializeApp();

import * as callables from "./callables";

export const db = admin.firestore();
export const FieldValue = admin.firestore.FieldValue;
export const FieldPath = admin.firestore.FieldPath;

exports.createWorkout = callables.createWorkout;
exports.updateWorkout = callables.updateWorkout;
exports.deleteWorkout = callables.deleteWorkout;
exports.getWorkouts = callables.getWorkouts;
