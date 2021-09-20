import { COLLECTION_WORKOUT } from '../utils/constants';
import { db } from '../services/firestore';

const createWorkout = async (data: any) => {
    return await db.collection(COLLECTION_WORKOUT).add(data);
};

const updateWorkout = async (data: any, updateId: string) => {
    const snapData = db.collection(COLLECTION_WORKOUT).doc(updateId);
    await snapData.set(data).catch((err) => {
        return err;
    });
    return true;
};

const getWorkouts = async () => {
    return await db.collection(COLLECTION_WORKOUT).get();
};

const getWorkout = async (workoutId: string) => {
    return await ( await db.collection(COLLECTION_WORKOUT).doc(workoutId).get()).data();
};

const deleteWorkout = async (workoutId: string) => {
    const snapData = db.collection(COLLECTION_WORKOUT).doc(workoutId);
    const workout = (await (snapData.get())).data();
    await snapData.delete().catch((err) => {
        return err;
    });
    return workout;
};

export default {
    createWorkout,
    updateWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
};
