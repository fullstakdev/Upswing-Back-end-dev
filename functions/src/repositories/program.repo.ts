import { db } from '../.';
import { COLLECTION_PROGRAM } from '../utils/constants';
import { IUserRoleType } from '../utils/enumeration';

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

const getProgramsByWorkoutId = async (workoutId: string) => {
    
    return [
        {programId: 'NK3aJmZ3QJN3jeNoPgDg', programName: 'lose weight'},
        {programId: 'OnLa4XTeToYu6gGgnYU9', programName: 'deeply sleep'}
    ];
}

const getProgramsByUserId = async (role: string, userId: string) => {
    let programDatas;
    let result: any = [];
    if (role === IUserRoleType.TRAINER) {
        programDatas = await db.collection(COLLECTION_PROGRAM)
            .where('trainerId', '==', userId).get();
    } else if (role === IUserRoleType.MEMBER) {
        programDatas = await db.collection(COLLECTION_PROGRAM)
            .where('memberIds', 'array-contains', userId).get();
    }
    
    if (programDatas && programDatas.docs) {
        if (programDatas.docs.length > 0) {
            programDatas.docs.map((doc) => {
                result.push(doc.data());
            })
        }
        return { docs: result };
    }
    return null;
}

const getProgramsByStatus = async (status: string) => {
    return {};
}

export default {
    searchProgram,
    getProgramsByWorkoutId,
    getProgramsByUserId,
    getProgramsByStatus,
};
