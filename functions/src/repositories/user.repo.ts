import { db } from '../.';
import { COLLECTION_USER } from '../utils/constants';

interface ISearchUserParams {
    name?: string;
    gender?: string;
    email?: string;
    userType?: string;
    goalArchive?: boolean;
}

const searchUser = async (data: any) => {
    const params: ISearchUserParams = data;
    const users = await db.collection(COLLECTION_USER).get();    
    const resultData: any = [];
    users.docs.map((doc) => {
        const docData = doc.data();
        if (params.name && !docData.name.includes(params.name)) return;
        if (params.gender && docData.gender !== params.gender) return;
        if (params.email && docData.email !== params.email) return;
        if (params.userType && docData.userType !== params.userType) return;
        docData['id'] = doc.id;
        resultData.push(docData);
        return resultData;
    });
    return resultData;
};

export default {
    searchUser,
};