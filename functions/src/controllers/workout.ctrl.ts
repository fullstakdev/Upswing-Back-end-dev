import { Request, Response } from 'express';
// import { matchedData } from 'express-validator';
import { COLLECTION_WORKOUT } from '../utils/constants';
import { buildErrObject, handleError, handleSuccess } from '../utils';
import { createItem, updateItem, deleteItemById, getItemById, getAllPaginatedItems } from '../repositories/common.repo';
import { IWorkout } from '../interfaces';
import { FieldValue } from '..';
import repository from '../repositories/workout.repo';

export const createWorkout = async (req: Request, res: Response): Promise<Response> => {
  const params: IWorkout = req.body.data;
  params.rating = 0;
  params.difficulty = 0;
  const timestamp = FieldValue.serverTimestamp(); // Instead of new Date().getTime()
  params.createdAt = timestamp as unknown as number;
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
  // testing purpose
  const condition = [{
    key: 'type',
    operator: '==',
    value: 'planned',
  }];

  // testing purpose
  const options = {
    page: 1,
    limit: 10,
    sort: 'createdAt',
  };

  try {
    const result = await getAllPaginatedItems(COLLECTION_WORKOUT, condition, options);
    return handleSuccess(res, result);
  } catch (error) {
    return handleError(res, error);
  }
};

export const searchWorkouts = async (req: Request, res: Response): Promise<Response> => {
  const searchData = req.body.data;
  console.log(searchData);
  try {
    const searchResult = await repository.searchWorkout(searchData);

    const perPage = searchData.perPage ? searchData.perPage : 10;
        const page = searchData.page;
        const totalDocs = searchResult.length;
        const totalPages = Math.ceil(totalDocs / perPage);
        const nextPage = totalPages > page ? page + 1 : page;
        const prevPage = page - 1 > 0 ? page - 1 : page;

        const result = {
            docs: searchResult,
            limit: perPage,
            page: page,
            totalPages: totalPages,
            totalDocs: totalDocs,
            hasPrevPage: nextPage !== page,
            hasNextPage: prevPage !== page,
            prevPage: prevPage,
            nextPage: nextPage,
        };
    return handleSuccess(res, result);
  } catch (error) {
    return handleError(res, error);
  }
};
