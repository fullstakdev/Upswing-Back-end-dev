import { Request, Response } from 'express';
// import { matchedData } from 'express-validator';
import { COLLECTION_WORKOUT } from '../utils/constants';
import { buildErrObject, handleError, handleSuccess, paginationHandler } from '../utils';
import { createData, updateData, deleteDataById, getDataById, getAllDatas } from '../repositories/common.repo';
import repository from '../repositories/workout.repo';
import { IWorkout } from '../interfaces/workout';

export const createWorkout = async (req: Request, res: Response): Promise<Response> => {
  const params: IWorkout = req.body.data;
  params.rating  = 0;
  params.difficulty = 0;
  try{
    const result = await createData(COLLECTION_WORKOUT, params );
    if (!result.id) {
      throw buildErrObject(500, result);
    }
    params.id = result.id;
    return handleSuccess(res, { docs: { ...params } });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateWorkout = async (req: Request, res: Response): Promise<Response> => {
  const workoutId = req.body.workoutId;
  const params: IWorkout = req.body.data;
  // const data = matchedData(req);
  try {
    const result = await updateData(COLLECTION_WORKOUT, workoutId, params);
    if (!result) {
        throw buildErrObject(500, result);
    }
    params.id = workoutId;
    return handleSuccess(res, { docs: { ...params } });
} catch (error) {
    return handleError(res, error);
}
};

export const deleteWorkout = async (req: Request, res: Response): Promise<Response> => {
  const workoutId = req.params.workoutId;
  // const data = matchedData(req);
  try {    
    const result = await deleteDataById(COLLECTION_WORKOUT, workoutId);
    if (!result) {
        throw buildErrObject(500, result);
    }
    result.id = workoutId;
    return handleSuccess(res, result);
  } catch (error) {
      return handleError(res, error);
  }
};

export const getWorkout = async (req: Request, res: Response): Promise<Response> => {
  const workoutId = req.params.workoutId;
  // const data = matchedData(req);
  try {
    const result = await getDataById(COLLECTION_WORKOUT, workoutId);
    if (!result) {
        throw buildErrObject(500, result);
    }
    result.id = workoutId;
    return handleSuccess(res, result);
  } catch (error) {
      return handleError(res, error);
  }
};

export const getAllWorkouts = async (req: Request, res: Response): Promise<Response> => {
  try{
    const snapsResults = await getAllDatas(COLLECTION_WORKOUT);
    if (!snapsResults) {
        throw buildErrObject(500, snapsResults);
    }
    const allWorkouts: any = [];
    let row = 0;
    snapsResults.forEach((doc: any) => {
        const workout = doc.data();
        workout['id'] = doc.id;
        allWorkouts.push(workout);
        row++;
    });
    const result = {
        docs: allWorkouts,
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
}

export const searchWorkouts = async (req: Request, res: Response): Promise<Response> => {
  const searchData = req.body.data;
  try{
    const searchResult = await repository.searchWorkout(searchData);
    const perPage = searchData.perPage ? searchData.perPage : 10;
    const result = paginationHandler(searchResult, searchData.page, perPage);
    return handleSuccess(res, result);
  } catch (error) {
    return handleError(res, error);
  }
};
