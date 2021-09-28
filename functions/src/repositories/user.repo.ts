import { db } from '../.';
import repository from '../repositories/goal.repo';
import { COLLECTION_USER } from '../utils/constants';

interface ISearchUserParams {
    name?: string;
    gender?: string;
    email?: string;
    role?: string;
    goalArchive?: string;
}

const createUser = async (userData: any) => {
    const userInfo: any = userData.data;
    const result = await db.collection(COLLECTION_USER).add(userInfo);
    if (result && result.id) {
        userInfo.id = result.id;
        if (userData.goal) {
            await repository.createGoals(result.id, userData.goal);
        }        
    } 
    return userInfo;
};

const updateUser = async (userId: string, userData: any, goalDatas?: any[]) => {
    const userInfo: any = userData.data;
    const snapData = db.collection(COLLECTION_USER).doc(userId);
    await snapData.set(userInfo).catch((err) => {
        return err;
    });
    return true;
};

const getUserByEmail = async (userEmail: any) => {
    const user = await (await db.collection(COLLECTION_USER)
        .where('email', '==', userEmail).get()).docs;
    if (user && user.length > 0) {
        console.log(user[0].data());
        return user[0].data();
    }
    return {};
};

const searchUser = async (data: any) => {
    const params: ISearchUserParams = data;
    const users = await db.collection(COLLECTION_USER).get();    
    const resultData: any = [];
    users.docs.map((doc) => {
        const docData = doc.data();
        if (params.name && !docData.name.includes(params.name)) return;
        if (params.gender && docData.gender !== params.gender) return;
        if (params.email && docData.email !== params.email) return;
        if (params.role && !docData.roles.includes(params.role)) return;
        docData['id'] = doc.id;
        resultData.push(docData);
        return resultData;
    });
    return resultData;
};

export default {
    createUser,
    updateUser,
    searchUser,
    getUserByEmail,
};