import { db } from '../.';
// import {db, FieldValue, FieldPath} from '.';
import * as dbPagination from '../services/db.pagination';
import { IGetCondition, IPaginationOption, IPaginationResponse } from '../interfaces/common';
import { buildErrObject } from '../utils';
import { COLLECTION_WORKOUT } from '../utils/constants';
import { IWorkoutType } from '../utils/enumeration';
import trainerRepository from '../repositories/trainer.repo';
import workoutRepository from '../repositories/workout.repo';
import programRepository from '../repositories/program.repo';

export const createItem = async (collectionName: string, data: any) => {
  data.createdAt = new Date().getTime();
  return await db.collection(collectionName).add(data);
};

export const updateItem = async (collectionName: string, updateId: string, data: any) => {
  const snapData = db.collection(collectionName).doc(updateId);
  const doc = (await snapData.get()).data();
  let updateData: any = data;  
  if( doc ) {
    const keys = Object.keys(data);
    keys.map( (key: string) => {
      console.log(key, doc[key]);
      doc[key] = data[key];
    });
    updateData = doc;
  }
  updateData.updatedAt = new Date().getTime();
  await snapData.set(updateData).catch((err) => {
      return err;
  });
  return updateData;
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
};

export const getAllPaginatedItems = async (
  collectionName: string,
  options: IPaginationOption,
  conditions?: IGetCondition[],  
): Promise<IPaginationResponse> => {
  const { limit, page, sort } = options;
  const startRange = (page - 1) * limit;
  let snapsResults;  
  if (conditions) {
    snapsResults = await dbPagination.getAllItems(collectionName, startRange, limit, conditions, sort);
  } else {
    snapsResults = await dbPagination.getAllItems(collectionName, startRange, limit);
  }
   
  if (!snapsResults) {
    throw buildErrObject(500, snapsResults);
  }
  const allDocs: any = [];
  let lastDoc = null;
  let hasNextPage = false;
  let hasPrevPage = false;
  let totalDocs = 0;
  let totalPages = 0;
  let nextPage = page < totalPages ? page + 1 : page;
  let prevPage = page > 1 ? page - 1 : 1;
  if (snapsResults._size > 0 ) {
    console.log('snaps result: ', snapsResults._size);
    snapsResults.forEach(async (doc: any) => {
      const item = doc.data();
      item['id'] = doc.id;
      if (collectionName === COLLECTION_WORKOUT) {
        item['trainerName'] = await trainerRepository.getTrainerNameById(doc.trainerId);
        item['duration'] = (item.type === IWorkoutType.PLANNED ? 
          item.exerciseIds ? 
            await workoutRepository.getDurationPlannedWorkout(item.exerciseIds)
            : 1
          : item.data && item.data.duration ? item.data.duration : 2);
        item['usedProgram'] = await programRepository.getProgramsByWorkoutId(doc.id);
        console.log('item: ', item);
      }
      allDocs.push(item);
    });
    lastDoc = snapsResults.docs[snapsResults.docs.length - 1];
    hasNextPage = await dbPagination.checkIfNextPage(collectionName, lastDoc.data().createdAt, 1, lastDoc);
    hasPrevPage = page > 1;
    totalDocs = await dbPagination.paginatedCount(collectionName);
    totalPages = Math.ceil(totalDocs / limit);
    nextPage = page < totalPages ? page + 1 : page;
    prevPage = page > 1 ? page - 1 : 1;
  }
  return {
    docs: allDocs,
    limit,
    prevPage,
    nextPage,
    hasPrevPage,
    hasNextPage,
    totalPages,
    totalDocs,
    page,
  };
};
