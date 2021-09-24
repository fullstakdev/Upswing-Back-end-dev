import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
// import {db, FieldValue, FieldPath} from '../.';
import { COLLECTION_EXERCISE } from '../utils/constants';
import { buildErrObject, handleError, handleSuccess } from '../utils';
import { createItem, updateItem, deleteItemById, getItemById, getAllItems } from '../repositories/common.repo';
import { IExercise } from '../interfaces';

export const createExercise = async (req: Request, res: Response): Promise<Response> => {
  try{
    const params: IExercise = req.body.data;
    const result = await createItem(COLLECTION_EXERCISE, params );
    if (!result.id) {
      throw buildErrObject(500, result);
    }
    params.id = result.id;
    return handleSuccess(res, { docs: { ...params } });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateExercise = async (req: Request, res: Response): Promise<Response> => {
  const exerciseId = req.body.exerciseId;
  const params:any = req.body.data;
  try {
    // TODO: Uncomment when validation is implemented and replace data below with cleanData
    // const cleanData = matchedData(data);
    const result = await updateItem(COLLECTION_EXERCISE, exerciseId, params);
    if (!result) {
        throw buildErrObject(500, result);
    }
    params.id = exerciseId;
    return handleSuccess(res, { docs: { ...params } });
  } catch (error) {
      return handleError(res, error);
  }
};

export const deleteExercise = async (req: Request, res: Response): Promise<Response> => {
  const exerciseId = req.params.exerciseId;
  try {
    const data = matchedData(req);
    const result = await deleteItemById(COLLECTION_EXERCISE, exerciseId);
    if (result && result.name) {
        result.id = data.exerciseId;
        return handleSuccess(res, result);
    }
    throw buildErrObject(500, result);
  } catch (error) {
      return handleError(res, error);
  }
};

export const getExercise = async (req: Request, res: Response): Promise<Response> => {
  const exerciseId = req.params.exerciseId;
  // const data = matchedData(req);
  try {
    const result = await getItemById(COLLECTION_EXERCISE, exerciseId);
    if (result && result.name) {
        result.id = exerciseId;
        return handleSuccess(res, result);
    }
    throw buildErrObject(500, result);
  } catch (error) {
      return handleError(res, error);
  }
};

export const getAllExercises = async (req: Request, res: Response): Promise<Response> => {
  try {
    const snapsResults = await getAllItems(COLLECTION_EXERCISE);
    if (!snapsResults) {
        throw buildErrObject(500, snapsResults);
    }
    const allExercises: any = [];
    let row = 0;
    snapsResults.forEach((doc: any) => {
        const exercise = doc.data();
        exercise['id'] = doc.id;
        allExercises.push(exercise);
        row++;
    });
    const result = {
        docs: allExercises,
        limit: 10,
        page: 1,
        totalPages: 1,
        totalDocs: row,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: 0,
        nextPage: 0,
    };

    return handleSuccess(res, result);
  } catch (error) {
    return handleError(res, error);
  }
};

export const searchExercises = async (req: Request, res: Response): Promise<Response> => {
  const searchData = req.body.data;
  console.log(searchData);
  try {
    const snapsResults = await getAllItems(COLLECTION_EXERCISE);
    if (!snapsResults) {
        throw buildErrObject(500, snapsResults);
    }
    const allExercises: any = [];
    let row = 0;
    snapsResults.forEach((doc: any) => {
        const exercise = doc.data();
        exercise['id'] = doc.id;
        allExercises.push(exercise);
        row++;
    });
    const result = {
        docs: allExercises,
        limit: 10,
        page: 1,
        totalPages: 1,
        totalDocs: row,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: 0,
        nextPage: 0,
    };

    return handleSuccess(res, result);
  } catch (error) {
    return handleError(res, error);
  }
};
