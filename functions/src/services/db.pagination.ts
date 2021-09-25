import { DocumentSnapshot } from 'firebase-functions/v1/firestore';
import { IGetCondition } from '../interfaces/common';
import { db, FieldPath } from '../index';

export const getAllItems = async (
    collectionName: string,
    startRange: number,
    limit: number,
    conditions?: IGetCondition[],
    sortKeyword = 'createdAt'
) => {
    let colRef: any = db.collection(collectionName);
    let lastDocRef = colRef;
    // To handle cases where startAfter in 0 and no condition
    if (!startRange && !conditions) {
        return await colRef.orderBy(sortKeyword).limit(limit).get();
    }
    // If startAfter is 0 but condition is passed
    if (!startRange && conditions && conditions?.length > 0) {
        conditions.forEach((condition) => {
            colRef = colRef.where(condition.key, condition.operator, condition.value);
        });
        colRef = colRef.orderBy(sortKeyword);
        return await colRef.limit(limit).get();
    }

    if (conditions && conditions?.length > 0) {
        conditions.forEach((condition) => {
            colRef = colRef.where(condition.key, condition.operator, condition.value);
        });
        colRef = colRef.orderBy(sortKeyword);
        const snapshot = await colRef.limit(startRange).get();
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];

        lastDocRef = lastDocRef.orderBy(sortKeyword);
        conditions.forEach((condition) => {
            lastDocRef = lastDocRef.where(condition.key, condition.operator, condition.value);
        });
        lastDocRef = lastDocRef.startAfter(lastDoc.data().createdAt);
        return await lastDocRef.limit(limit).get();
    }

    const snapshot = await colRef.orderBy(sortKeyword).limit(startRange).get();
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    return await colRef.orderBy(sortKeyword)
        .startAfter(lastDoc.data().createdAt)
        .limit(limit).get();
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
