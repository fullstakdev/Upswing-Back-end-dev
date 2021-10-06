import { db } from '../.';
import goalRepository from '../repositories/goal.repo';
import { COLLECTION_PROGRAM, COLLECTION_USER } from '../utils/constants';

interface ISearchUserParams {
    name?: string;
    gender?: string;
    email?: string;
    role?: string;
    goalArchive?: string;
}

const createUser = async (userData: any) => {
    const userInfo: any = userData.data;
    const userId = 'pPOExQ1m7QeRIdVw9XgCCkxEWeU2';
    const result: any = await db.collection(COLLECTION_USER).doc(userId).set(userInfo);
    if (result) {
        result.id = userId;
        if (userData.goals) {
            await goalRepository.createGoals(userId, userData.goals);
            userInfo.goals = userData.goals;
        }
        if (userData.programs) {
            await addProgramsInUser(userId, userData.programs);
            userInfo.programs = userData.programs;
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

const addProgramsInUser = async (userId: string, programsData: any[]) => {
    const batch = db.batch();
    programsData.map((program: any) => {
        const programRef = db.collection(COLLECTION_USER).doc(userId).collection(COLLECTION_PROGRAM).doc();
        batch.create(programRef, program);
        return programRef;
    });
    const result = await batch.commit();
    return result;
};

/**
 * To get only user information from token
 * @param userEmail 
 * @returns user Object
 */
const getUserInfoByEmail = async (userEmail: any) => {
    const user = await (await db.collection(COLLECTION_USER)
        .where('email', '==', userEmail).get()).docs;
        
    const tokenUser: any = {};

    if (user && user.length > 0) {
        const doc: any = user[0].data();
        tokenUser.userId = user[0].id;
        tokenUser.email = doc.email;
        tokenUser.roles = doc.roles;
        return tokenUser;
    }
    return {};
};

const getUsersByProgramId = async (programId: string) => {
    // const user = await db.collection(COLLECTION_USER);
    return {};
}

const getUsersByMemberIds = async (memberIds: string[]) => {
    const usersRef = await db.collection(COLLECTION_USER);
    const refDocs: any = [];
    const result: any = [];
    memberIds.map(async (memberId) => {
        refDocs.push(usersRef.doc(memberId).get());
    });
    
    await Promise.all(refDocs).then(userDocs => {
        userDocs.forEach((userDoc: any) => result.push(userDoc.data()));
        return result;
    })
    return result;
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
    addProgramsInUser,
    getUserInfoByEmail,
    getUsersByProgramId,
    getUsersByMemberIds,
};