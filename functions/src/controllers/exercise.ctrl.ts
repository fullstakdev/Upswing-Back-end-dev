import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
// import {db, FieldValue, FieldPath} from '../.';
import { COLLECTION_EXERCISE } from '../utils/constants';
import { buildErrObject, handleError, handleSuccess, paginationHandler } from '../utils';
import { createItem, updateItem, deleteItemById, getItemById, getAllItems } from '../repositories/common.repo';
import { IExercise } from '../interfaces';
import repository from '../repositories/exercise.repo';

export const createExercise = async (req: Request, res: Response): Promise<Response> => {
  try {
    const params: IExercise = req.body;
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
  const exerciseId = req.body.id;
  const params: any = req.body.data;
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
  const page = req.body.page ? req.body.page : 1;
  const perPage = req.body.perpage ? req.body.page : 10;
  try {
    const snapsResults = await getAllItems(COLLECTION_EXERCISE);
    if (!snapsResults) {
        throw buildErrObject(500, snapsResults);
    }
    const allExercises: any = [];
    snapsResults.forEach((doc: any) => {
        const exercise = doc.data();
        exercise['id'] = doc.id;
        allExercises.push(exercise);
    });

    const result = paginationHandler(allExercises, page, perPage);
    return handleSuccess(res, result);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllExercisesByWorkoutId = async (req: Request, res: Response): Promise<Response> => {

  try {
    return handleSuccess(res, {});
  } catch (error) {
    return handleError(res, error);
  }
}
export const searchExercises = async (req: Request, res: Response): Promise<Response> => {
  const searchData = req.body;
  try {
    const searchResult = await repository.searchExercise(searchData);
    const perPage = searchData.perPage ? searchData.perPage : 10;
    const result = paginationHandler(searchResult, searchData.page, perPage);
    return handleSuccess(res, result);
  } catch (error) {
    return handleError(res, error);
  }
};
