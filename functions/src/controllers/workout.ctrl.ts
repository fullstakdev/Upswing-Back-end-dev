import { Request, Response } from 'express';
// import { matchedData } from 'express-validator';
import { COLLECTION_WORKOUT } from '../utils/constants';
import { buildErrObject, handleError, handleSuccess, paginationHandler } from '../utils';
import { createItem, updateItem, deleteItemById, getItemById, getAllItems } from '../repositories/common.repo';
// import { getAllPaginatedItems } from '../repositories/common.repo';
import repository from '../repositories/workout.repo';
import { IWorkout } from '../interfaces/workout';

export const createWorkout = async (req: Request, res: Response): Promise<Response> => {
  const params: IWorkout = req.body.data;
  params.rating  = 0;
  params.difficulty = 0;
  try{
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
  const workoutId = req.body.workoutId;
  const params: IWorkout = req.body.data;
  // const data = matchedData(req);
  try {
    const result = await updateItem(COLLECTION_WORKOUT, workoutId, params);
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
  const page = req.body.page ? req.body.page : 1;
  const perPage = req.body.perpage ? req.body.page : 10;
  try{
    const snapsResults = await getAllItems(COLLECTION_WORKOUT);
    if (!snapsResults) {
        throw buildErrObject(500, snapsResults);
    }
    const allWorkouts: any = [];
    snapsResults.forEach((doc: any) => {
        const workout = doc.data();
        workout['id'] = doc.id;
        allWorkouts.push(workout);
    });
    const result = paginationHandler(allWorkouts, page, perPage);
    return handleSuccess(res, result);
  } catch (error) {
    return handleError(res, error);
  }
}

// export const getAllWorkouts = async (req: Request, res: Response): Promise<Response> => {
//   // testing purpose
//   const condition = {
//     key: 'type',
//     operator: '==',
//     value: 'planned',
//   };

//   // testing purpose
//   const options = {
//     page: 1,
//     limit: 10,
//     sort: 'createdAt',
//   };

//   try {
//     const result = await getAllPaginatedItems(COLLECTION_WORKOUT, condition, options);
//     return handleSuccess(res, result);
//   } catch (error) {
//     return handleError(res, error);
//   }
// };

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
