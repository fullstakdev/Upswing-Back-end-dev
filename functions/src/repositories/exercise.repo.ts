import { db } from '../.';
import { COLLECTION_EXERCISE } from '../utils/constants';

interface ISearchExerciseParams {
    name?: string;
    ids?: string[];
    trainerId?: string;
    page: number;
    perPage?: number;
}

const searchExercise = async (data: any) => {
    const params: ISearchExerciseParams = data;
    const programs = await db.collection(COLLECTION_EXERCISE).get();    
    const resultData: any = [];
    programs.docs.map((doc) => {
        const docData = doc.data();
        if (params.ids && params.ids.length > 0 && !params.ids.includes(doc.id)) return;
        if (params.name && !docData.name.includes(params.name)) return;
        if (params.trainerId && docData.trainerId !== params.trainerId) return;
        docData['id'] = doc.id;
        resultData.push(docData);
        return resultData;
    });
    return resultData;
};

export default {
    searchExercise,
};