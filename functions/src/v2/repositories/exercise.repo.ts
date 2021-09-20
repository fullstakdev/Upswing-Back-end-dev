import { COLLECTION_EXERCISE } from '../utils/constants';
import { db } from '../services/firestore';

const createExercise = async (data: any) => {
    return await db.collection(COLLECTION_EXERCISE).add(data);
};

const updateExercise = async (data: any, updateId: string) => {
    const snapData = db.collection(COLLECTION_EXERCISE).doc(updateId);
    await snapData.set(data).catch((err) => {
        return err;
    });
    return true;
};

const getExercises = async () => {
    return await db.collection(COLLECTION_EXERCISE).get();
};

const getExercise = async (exerciseId: string) => {
    return await ( await db.collection(COLLECTION_EXERCISE).doc(exerciseId).get()).data();
};

const deleteExercise = async (exerciseId: string) => {
    const snapData = db.collection(COLLECTION_EXERCISE).doc(exerciseId);
    const exercise = (await (snapData.get())).data();
    await snapData.delete().catch((err) => {
        return err;
    });
    return exercise;
};

export default {
    createExercise,
    updateExercise,
    getExercises,
    getExercise,
    deleteExercise,
};
