import { db } from '../.';
// import {db, FieldValue, FieldPath} from '.';
import * as dbPagination from '../services/db.pagination';
import { IGetCondition, IPaginationOption, IPaginationResponse } from '../interfaces/common';
import { buildErrObject } from '../utils';

export const createItem = async (collectionName: string, data: any) => {
  return await db.collection(collectionName).add(data);
};

export const updateItem = async (collectionName: string, updateId: string, data: any) => {
  const snapData = db.collection(collectionName).doc(updateId);
    await snapData.set(data).catch((err) => {
        return err;
    });
    return true;
};

export const deleteItemById = async (collectionName: string, deleteId: string) => {
  const snapData = db.collection(collectionName).doc(deleteId);
    const exercise = (await (snapData.get())).data();
    await snapData.delete().catch((err) => {
        return err;
    });
    return exercise;
};

export const getItemById = async (collectionName: string, searchId: string) => {
  return await ( await db.collection(collectionName).doc(searchId).get()).data();
};

export const getAllItems = async (collectionName: string) => {
  return await db.collection(collectionName).get();
}

export const getAllPaginatedItems = async (
  collectionName: string,
  condition: IGetCondition,
  options: IPaginationOption,
): Promise<IPaginationResponse> => {
  const { page, limit, sort } = options;
  const startRange = (page - 1) * limit;
  const snapsResults = await dbPagination.getAllItems(collectionName, startRange, limit, condition, sort);
  if (!snapsResults) {
    throw buildErrObject(500, snapsResults);
  }
  const allDocs: any = [];
  snapsResults.forEach((doc: any) => {
    const item = doc.data();
    item['id'] = doc.id;
    allDocs.push(item);
  });
  const lastDoc = snapsResults.docs[snapsResults.docs.length - 1];
  const hasNextPage = await dbPagination.checkIfNextPage(collectionName, lastDoc.data().createdAt, 1, lastDoc);
  const hasPrevPage = page > 1;
  const totalDocs = await dbPagination.paginatedCount(collectionName);
  const totalPages = Math.ceil(totalDocs / limit);
  const nextPage = page < totalPages ? page + 1 : page;
  const prevPage = page > 1 ? page - 1 : 1;
  return {
    limit,
    prevPage,
    nextPage,
    hasPrevPage,
    hasNextPage,
    totalPages,
    totalDocs,
    page,
    docs: allDocs,
  };
};
