import { db } from '../.';
import { COLLECTION_PROGRAM } from '../utils/constants';

interface ISearchProgramParams {
    name?: string;
    types?: string[];
    location?: string;
    level?: string;
    format?: string;
    ids?: string[];
    page: number;
    perPage?: number;
}

const searchProgram = async (data: any) => {
    const params: ISearchProgramParams = data;
    const programs = await db.collection(COLLECTION_PROGRAM).get();
    const resultData: any = [];
    programs.docs.map((doc) => {
        const docData = doc.data();
        if (params.ids && params.ids.length > 0 && !params.ids.includes(doc.id)) return;
        if (params.name && !docData.name.includes(params.name)) return;
        if (params.types && params.types.filter( (type) => docData.types.includes(type)).length === 0 ) return;
        if (params.location && docData.location !== params.location) return;
        if (params.level && docData.level !== params.level) return;
        if (params.format && docData.format !== params.format) return;
        docData['id'] = doc.id;
        resultData.push(docData);
        return resultData;
    });
    return resultData;
};

export default {
    searchProgram,
};
