
import * as functions from "firebase-functions";
import {db, FieldValue, FieldPath} from ".";
import { COLLECTION_WORKOUT } from "./utils/constant";

export const createWorkout = functions.https.onRequest( async (req, res) => {
    // const params = data;
    console.log('createWorkout function: ', req.query, req.params);  
    try {
        res.status(200).json ({status: 200, result: {result: 'success'}});
    } catch (err) {
        console.error(JSON.stringify(err));
        throw new functions.https.HttpsError("internal", JSON.stringify(err));
    }
})

export const updateWorkout = functions.https.onRequest( async (req, res) => {

    try {
        res.status(200).json({status: 200, result: 'update success'});
    }catch(err) {
        console.error(JSON.stringify(err));
        throw new functions.https.HttpsError("internal", JSON.stringify(err));
    }
})

export const deleteWorkout = functions.https.onRequest( async (req, res) => {

    try {
        res.status(200).json({status: 200, result: 'delete success'});
    }catch(err) {
        console.error(JSON.stringify(err));
        throw new functions.https.HttpsError("internal", JSON.stringify(err));
    }
})

export const getWorkouts = functions.https.onRequest( async (req, res) => {
    console.log(db, FieldValue, FieldPath);
    const collectionId =req.body.collectionId;
    try {
        const workouts = await db
            .collection(COLLECTION_WORKOUT)
            .where("collectionId", "==", collectionId)
            .get();
        if(workouts.empty){
            // return [];
            res.status(200).json({status: 200, result: {result: 'empty'}});
        }


        res.status(200).json({status: 200, result: {result: 'get success'}});
    } catch (err) {
        console.error (JSON.stringify(err));
        throw new functions.https.HttpsError('internal', JSON.stringify(err));
    }
})