import { db } from '../.';
import { COLLECTION_WORKOUT, COLLECTION_EXERCISE } from '../utils/constants';
// import repository from './trainer.repo';

const getAllWorkoutsByIds = async (ids: string[]) => {
    const resultData: any = [];
    if ((await db.collection(COLLECTION_WORKOUT).listDocuments()).length > 0) {        
        ids.map( async (id: string) => {
            const doc: any = await (await db.collection(COLLECTION_WORKOUT).doc(id).get()).data();
            if (doc) {
                doc.id = id;
                resultData.push(doc);
            }
        });
    }
    return resultData;
}

const getAllWorkoutsByProgramId = async (id: string) => {
    const resultData: any = [];
    await db.collection(COLLECTION_WORKOUT).where('programIds', 'array-contains', id)
        .get().then( responseData => {
            responseData.docs.map((doc) => {
                resultData.push(doc.data());
            });
            return resultData;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
    return resultData;
}

const getDurationPlannedWorkout = async (exerciseIds: string[]) => {
    let sum = 400;
    await exerciseIds.map( async (id) => {
        const exercise = await (await db.collection(COLLECTION_EXERCISE).doc(id).get()).data();
        if (exercise && exercise.duration) {
            sum += Number(exercise.duration);
            console.log(id, sum);
        }
        return sum;
    })
    return sum;
}

export default {
    getAllWorkoutsByIds,
    getAllWorkoutsByProgramId,
    getDurationPlannedWorkout,
};
