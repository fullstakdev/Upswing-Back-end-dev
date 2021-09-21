import { db } from '../.';
import { COLLECTION_USER } from '../utils/constants';

const createUser = () => {};

const updateUser = () => {};

const getUsers = () => {};

const getUser = () => {};

const deleteUser = () => {};

const getUserById = async (id: string) => {
    return await (await db.collection(COLLECTION_USER).where('id', '==', id).get()).docs[0].data();
};

export default {
    createUser,
    updateUser,
    getUsers,
    getUser,
    getUserById,
    deleteUser,
};