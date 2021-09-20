import { COLLECTION_USER } from '../utils/constants';
import { db } from '../services/firestore';

const createUser = async (user: any) => {
    return await db.collection(COLLECTION_USER).add(user);
};

const updateUser = async (data: any, userId: string) => {
    const snapData = db.collection(COLLECTION_USER).doc(userId);
    await snapData.set(data).catch((err) => {
        return err;
    });
    return true;
};

const getUsers = async () => {
    return await db.collection(COLLECTION_USER).get();
};

const getUser = async (userId: string) => {
    return await ( await db.collection(COLLECTION_USER).doc(userId).get()).data();
};

const deleteUser = async (userId: string) => {
    const snapData = db.collection(COLLECTION_USER).doc(userId);
    const user = (await(snapData.get())).data();
    await snapData.delete().catch((err) => {
        return err;
    });
    return user;
};

export default {
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,
};
