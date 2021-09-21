import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as express from 'express';
import routes from './routes';

admin.initializeApp();
export const db = admin.firestore();
// export const FieldValue = admin.firestore.FieldValue;
// export const FieldPath = admin.firestore.FieldPath;

const app = express();
app.use('/', routes);

exports.api = functions.https.onRequest(app);
