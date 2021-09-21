import { db } from '../.';
// import {db, FieldValue, FieldPath} from '.';

export const createData = async (collectionName: string, data: any) => {
  return await db.collection(collectionName).add(data);
};

export const updateData = async (collectionName: string, updateId: string, data: any) => {
  const snapData = db.collection(collectionName).doc(updateId);
    await snapData.set(data).catch((err) => {
        return err;
    });
    return true;
};

export const deleteDataById = async (collectionName: string, deleteId: string) => {
  const snapData = db.collection(collectionName).doc(deleteId);
    const exercise = (await (snapData.get())).data();
    await snapData.delete().catch((err) => {
        return err;
    });
    return exercise;
};

export const getDataById = async (collectionName: string, searchId: string) => {
  return await ( await db.collection(collectionName).doc(searchId).get()).data();
};

export const getAllDatas = async (collectionName: string) => {
  return await db.collection(collectionName).get();
}