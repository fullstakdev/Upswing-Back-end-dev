import { db } from '../.';
import { COLLECTION_WORKOUT } from '../utils/constants';

interface ISearchWorkoutParams {
    name?: string;
    types?: string[];
    trainerids?: string[];
    ids: string[];
    startTime?: number;
    endTime?: number;
    page: number;
    perPage?: number;
}

const searchWorkout = async (data: any) => {
    const params: ISearchWorkoutParams = data;
    const workouts = await db.collection(COLLECTION_WORKOUT).get();
    const resultData: any = [];
    workouts.docs.map((doc) => {
        const docData = doc.data();
        if (params.ids && params.ids.length > 0 && !params.ids.includes(doc.id)) return;
        if (params.name && !docData.name.includes(params.name)) return;
        if (params.types && !params.types.includes(docData.type) ) return;
        if (params.trainerids && params.trainerids.length > 0 &&
            !params.trainerids.includes(docData.trainerId)) return;
        if (params.startTime) {
            if (params.endTime) {
                if (docData.startTime < params.startTime && docData.startTime > params.endTime) {
                    return;
                }
            } else {
                if (docData.startTime !== params.startTime) {
                    return;
                }
            }
        }
        docData['id'] = doc.id;
        resultData.push(docData);
        return resultData;
    });
    return resultData;
};

export default {
    searchWorkout,
};
