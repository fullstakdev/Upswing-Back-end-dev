import { db } from '../.';
import { COLLECTION_GOAL, COLLECTION_USER } from '../utils/constants';

const createGoal = async (memberId: string, goalData: any) => {
    return await db.collection(COLLECTION_USER).doc(memberId).collection(COLLECTION_GOAL).add(goalData);
};

const createGoals = async (memberId: string, goalData: any[]) => {
    const batch = db.batch();
    goalData.map((goal: any) => {
        const goalRef = db.collection(COLLECTION_USER).doc(memberId).collection(COLLECTION_GOAL).doc();
        goal.createdAt = new Date().getTime();
        batch.create(goalRef, goal);
        return goalRef;
    });
    const result = await batch.commit();
    return result;
};

const updateGoal = async (memberId: string, goalId: string, data: any) => {
    const snapData = db.collection(COLLECTION_USER).doc(memberId).collection(COLLECTION_GOAL).doc(goalId);
    const doc = await (await snapData.get()).data();
    let updateData: any = data;
    if (doc) {
        const keys = Object.keys(data);
        keys.map((key: string) => {
            doc[key] = data[key];
        });
        updateData = doc;
    }
    updateData.updateAt = new Date().getTime();
    await snapData.set(updateData).catch((err) => {
        console.log(err);
        return null;
    });
    return updateData;
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