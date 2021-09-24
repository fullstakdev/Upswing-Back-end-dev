import { DocumentSnapshot } from 'firebase-functions/v1/firestore';
import { IGetCondition } from '../interfaces/common';
import { db, FieldPath } from '../index';

export const getAllItems = async (
    collectionName: string,
    startRange: number,
    limit: number,
    condition?: IGetCondition,
    sortKeyword = 'createdAt'
) => {
    // To handle cases where startAfter in 0 and no condition
    if (!startRange && !condition) {
        return await db.collection(collectionName)
            .orderBy(sortKeyword)
            .limit(limit)
            .get();
    }
    // If startAfter is 0 but condition is passed
    if (!startRange && condition) {
        return await db.collection(collectionName)
            .orderBy(sortKeyword)
            .where(condition.key, condition.operator, condition.value)
            .limit(limit)
            .get();
    }
    if (condition) {
        const firstBlock = db.collection(collectionName)
            .orderBy(sortKeyword)
            .where(condition.key, condition.operator, condition.value)
            .limit(startRange);
        const snapshot = await firstBlock.get();
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        return await db.collection(collectionName)
            .orderBy(sortKeyword)
            .where(condition.key, condition.operator, condition.value)
            .startAfter(lastDoc.data().createdAt)
            .limit(limit)
            .get();
    }
    const firstBlock = db.collection(collectionName)
        .orderBy(sortKeyword)
        .limit(startRange);
    const snapshot = await firstBlock.get();
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    return await db.collection(collectionName)
        .orderBy(sortKeyword)
        .startAfter(lastDoc.data().createdAt)
        .limit(limit)
        .get();
};

export const checkIfNextPage = async (
    collectionName: string,
    startRange: number,
    limit: number,
    lastDoc?: DocumentSnapshot,
    sortKeyword = 'createdAt'
): Promise<boolean> => {
    if (lastDoc) {
        const nextPageSnap = db.collection(collectionName)
            .orderBy(sortKeyword)
            .startAfter(startRange)
            .limit(limit)
            .get();
        if ((await nextPageSnap).docs.length === 1) {
            return true;
        }
    }
    return false;
};

export const paginatedCount = async (collectionName: string): Promise<number> => {
    const query =
        db.collection(collectionName)
            .orderBy(FieldPath.documentId(), 'asc');
    let lastDocId = '';
    let count = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const offsetQuery = lastDocId ? query.startAfter(lastDocId) : query;
        const snapshot = await offsetQuery.limit(2).get();
        const size = snapshot.size;
        if (size === 0) break;
        count += size;
        lastDocId = snapshot.docs[size - 1].id;
    }
    return count;
};
