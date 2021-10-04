import { Request, Response } from 'express';
// import { matchedData } from 'express-validator';
import { COLLECTION_WORKOUT } from '../utils/constants';
import { buildErrObject, handleError, handleSuccess } from '../utils';
import { createItem, updateItem, deleteItemById, getItemById, getAllPaginatedItems } from '../repositories/common.repo';
import repository from '../repositories/workout.repo';
import { IWorkout, ISearchWorkoutParams } from '../interfaces/workout';
import { IGetCondition } from '../interfaces/common';



export const createWorkout = async (req: Request, res: Response): Promise<Response> => {
  const params: IWorkout = req.body;
  params.rating = 0;
  params.difficulty = 0;
  params.createdAt = new Date().getTime();
  try {
    const result = await createItem(COLLECTION_WORKOUT, params );
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
  const workoutId = req.body.id;
  const params: IWorkout = req.body.data;
  params.updatedAt = new Date().getTime();
  // const data = matchedData(req);
  try {
    const result = await updateItem(COLLECTION_WORKOUT, workoutId, params);
    if (!result) {
        throw buildErrObject(500, result);
    }
    result.id = workoutId;
    return handleSuccess(res, { docs: { ...result } });
  } catch (error) {
      return handleError(res, error);
  }
};

export const deleteWorkout = async (req: Request, res: Response): Promise<Response> => {
  const workoutId = req.params.workoutId;
  // const data = matchedData(req);
  try {
    const result = await deleteItemById(COLLECTION_WORKOUT, workoutId);
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
    const result = await getItemById(COLLECTION_WORKOUT, workoutId);
    console.log('get data by id:', result);
    if (result) {
      result.id = workoutId; console.log('result id ');
      return handleSuccess(res, result);
    }
    throw buildErrObject(500, "no data");
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllWorkouts = async (req: Request, res: Response): Promise<Response> => {
  const page: number = req.query.page ? Number(req.query.page) : 1;
  const perPage: number = req.query.limit ? Number(req.query.limit) : 10;
  const sort: string = req.query.sort ? String(req.query.sort) : 'createdAt';

  const options = {
    page: page,
    limit: perPage,
    sort: sort,
  };

  try {
    const result = await getAllPaginatedItems(COLLECTION_WORKOUT, options);
    return handleSuccess(res, result);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getWorkoutByProgramId = async (req: Request, res: Response): Promise<Response> => {
  const programId = req.params.programId;
  try {
    const result = await repository.getAllWorkoutsByProgramId(programId);
    console.log('workouts by program id: ', programId, result);
    if (result){
      return handleSuccess(res, result);
    }
    throw buildErrObject(500, "no data");
  } catch (err) {
    return handleError(res, err);
  }
}

export const searchWorkouts = async (req: Request, res: Response): Promise<Response> => {
  const searchData: ISearchWorkoutParams = req.body;
  // const userInfo = JSON.parse(String(req.headers.user));
  // console.log(userInfo, searchData);
  const page = searchData.page ? searchData.page : 1;
  const limit = searchData.limit ? searchData.limit : 10;
  let sort = searchData.sort ? searchData.sort : 'createdAt';
  
  const conditions: IGetCondition[] = [];  
  
  let result: any;
  try {
    if (searchData.ids) {
      result = await repository.getAllWorkoutsByIds(searchData.ids);
    } else {
      if (searchData.name) conditions.push({ key: 'name', operator: '==', value: searchData.name });
      if (searchData.trainerId) conditions.push({ key: 'trainerId', operator: '==', value: searchData.trainerId });
      if (searchData.type) conditions.push({ key: 'type', operator: '==', value: searchData.type });
      if (searchData.from) {
        conditions.push({ key: 'startAt', operator: '>=', value: Number(searchData.from) });
        sort = 'startAt';
      }
      if (searchData.to) {
        conditions.push({ key: 'startAt', operator: '<=', value: Number(searchData.to) });
        sort = 'startAt';
      }
      const options = {
        page: page,
        limit: limit,
        sort: sort,
      };
      result = await getAllPaginatedItems(COLLECTION_WORKOUT, options, conditions);
    }
    return handleSuccess(res, result);
  } catch (error) {
    return handleError(res, error);
  }
};
