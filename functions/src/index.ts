import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";
import routes from './routes';

admin.initializeApp();
export const db = admin.firestore();
// export const FieldValue = admin.firestore.FieldValue;
// export const FieldPath = admin.firestore.FieldPath;

const app = express();
app.use('/', routes);

exports.api = functions.https.onRequest(app);


/**
 * callable for workout
 */
// app.post("/workout", callables.createWorkout);
// app.put("/workout", callables.updateWorkout);
// app.delete("/workout/:workoutId", callables.deleteWorkout);
// app.get("/workout/:workoutId", callables.getWorkout);
// app.post("/workout/list", callables.getWorkouts);

/**
 * callable for User
 */
// app.post("/user", callables.createUser);
// app.put("/user", callables.updateUser);
// app.delete("/user/:userId", callables.deleteUser);
// app.get("/users/:userId", callables.getUser);
// app.post("/users", callables.getUsers);

// app.post("/exercise", callables.createExercise);
// app.put("/exercise", callables.updateExercise);
// app.delete("/exercise/:exerciseId", callables.deleteExercise);
// app.get("/exercises/:exerciseId", callables.getExercise);
// app.post("/exercises", callables.getExercises);


/**
 * fileupload
 */
// app.post("/file", callables.uploadFiles);

// exports.onCreateWorkout = triggers.onCreateWorkout;
// exports.api = functions.https.onRequest(app);
