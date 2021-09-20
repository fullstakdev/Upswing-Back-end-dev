import { COLLECTION_PROGRAMS } from '../utils/constants';
import { db } from '../services/firestore';

const createProgram = () => {};

const updateProgram = () => {};

const getPrograms = async (data: any) => {
    // can modify query with respect to data
    return await db.collection(COLLECTION_PROGRAMS).get();
};

const getProgram = () => {};

const deleteProgram = () => {};

export default {
    createProgram,
    updateProgram,
    getPrograms,
    getProgram,
    deleteProgram,
};
