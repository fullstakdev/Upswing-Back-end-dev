import { db } from '../.';
import { COLLECTION_GOAL, COLLECTION_USER } from '../utils/constants';

const createGoal = async (memberId: string, goalData: any) => {
    return await db.collection(COLLECTION_USER).doc(memberId).collection(COLLECTION_GOAL).add(goalData);
};

const createGoals = async (memberId: string, goalData: any[]) => {
    const batch = db.batch();
    goalData.map((goal: any) => {
        const goalRef = db.collection(COLLECTION_USER).doc(memberId).collection(COLLECTION_GOAL).doc();
        batch.create(goalRef, goal);
        return goalRef;
    });
    const result = await batch.commit();
    return result;
};

const updateGoal = async (data: any) => {
    const snapData = db.collection(COLLECTION_USER).doc(data.memberId).collection(COLLECTION_GOAL).doc(data.id);
    const updateData = { name: data.name, status: data.status };
    await snapData.set(updateData).catch((err) => {
        return err;
    });
    return true;
};

const getGoals = async (memberId: string) => {
    return await db.collection(COLLECTION_USER).doc(memberId).collection(COLLECTION_GOAL).get();
};

const getGoal = async (memberId: string, goalId: string) => {
    return await ( await db.collection(COLLECTION_USER).doc(memberId).collection(COLLECTION_GOAL).doc(goalId).get()).data();
};

const deleteGoal = async (memberId: string, goalId: string) => {
    const snapData = db.collection(COLLECTION_USER).doc(memberId).collection(COLLECTION_GOAL).doc(goalId);
    const goal = (await (snapData.get())).data();
    await snapData.delete().catch((err) => {
        return err;
    });
    return goal;
};

export default {
    createGoal,
    createGoals,
    updateGoal,
    getGoals,
    getGoal,
    deleteGoal,
};