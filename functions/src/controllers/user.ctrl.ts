import { Request, Response } from 'express';
// import { matchedData } from 'express-validator';
import { buildErrObject, handleError, handleSuccess, paginationHandler } from '../utils';
import { IUser } from '../interfaces';
import { COLLECTION_PROGRAM, COLLECTION_USER } from '../utils/constants';
import { getUserInfoByToken } from '../utils';
import { deleteItemById, getItemById, getAllItems, getAllPaginatedItems } from '../repositories/common.repo';
import repository from '../repositories/user.repo';
import goalRepository from '../repositories/goal.repo';
// import { getAllPaginatedItems } from '../repositories/common.repo';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const params: IUser = req.body;
  // TODO: Uncomment when validation is implemented and replace data below with cleanData
  // const cleanData = matchedData(data);
  try {
    const result = await repository.createUser(params);
    if (result && result.id) {
        return handleSuccess(res, result);
    }
    throw buildErrObject(500, result);
  } catch (error) {
      return handleError(res, error);
  }
};

export const addProgramsInUser = async (req: Request, res: Response): Promise<Response> => {
  const loggedUser = getUserInfoByToken(req);
  const userId = loggedUser.userId;
  const programs = req.body.programs;
  try{
    const result = await repository.addProgramsInUser(userId, programs);
    console.log('add programs in user: ', result );
    return handleSuccess(res, result);
  } catch (error) {
    return handleError(res, error);
  }
}

export const addGoalsInUser = async (req: Request, res: Response): Promise<Response> => {
  const loggedUser = getUserInfoByToken(req);
  const userId = loggedUser.userId;
  const goals = req.body.goals;
  try {
    const result = await goalRepository.createGoals(userId, goals);
    return handleSuccess(res, result);
  } catch (err) {
    return handleError(res, err);
  }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const loggedUser = getUserInfoByToken(req);
  const userId = loggedUser.userId;
  const params: any = req.body.data;
  const goals: any[] = req.body.goals;
  // TODO: Uncomment when validation is implemented and replace data below with cleanData
  // const cleanData = matchedData(data);
  try {
    let result;
    if (goals) {
      result = await repository.updateUser(userId, params, goals);
    } else {
      result = await repository.updateUser(userId, params);
    }    
    if (!result) {
        throw buildErrObject(500, result);
    }
    params.id = userId;
    return handleSuccess(res, params);
  } catch (error) {
      return handleError(res, error);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.params.userId;
  // const data = matchedData(req);
  try {
    const result = await deleteItemById(COLLECTION_USER, userId);
    if (result && result.email) {
        result.id = userId;
        return handleSuccess(res, result);
    }
    throw buildErrObject(500, result);
  } catch (error) {
      return handleError(res, error);
  }
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const loggedUser = getUserInfoByToken(req);
  const userId = loggedUser.userId;
  // const data = matchedData(req);
  try {
    const result = await getItemById(COLLECTION_USER, userId);
    if (!result) {
        throw buildErrObject(500, result);
    }
    result.id = userId;
    return handleSuccess(res, result);
  } catch (error) {
      return handleError(res, error);
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  const page: number = req.query.page ? Number(req.query.page) : -1;
  const perPage: number = req.query.perpage ? Number(req.query.page) : -1;
  const sort: string = req.query.sort ? String(req.query.sort) : 'createdAt';
  
  if (page === -1 || perPage === -1) {
    try {
      const snapsResults = await getAllItems(COLLECTION_USER);
      if (!snapsResults) {
          throw buildErrObject(500, snapsResults);
      }
      const allUsers: any = [];
      snapsResults.forEach((doc: any) => {
          const user = doc.data();
          user['id'] = doc.id;
          allUsers.push(user);
      });
        
      return handleSuccess(res, allUsers);
    } catch (error) {
      return handleError(res, error);
    }
  }

  const options = {
    page: page,
    limit: perPage,
    sort: sort,
  }

  try {
    const result = await getAllPaginatedItems(COLLECTION_PROGRAM, options);
    return handleSuccess(res, result);
  } catch (err) {
    return handleError(res, err);
  }
};

export const getMembersByTrainerId = async (req: Request, res: Response) => {
  const loggedUser = getUserInfoByToken(req);
  const trainerId = loggedUser.userId;
  try {
    console.log('trainer', trainerId);
    return {};
  } catch (err) {
    return handleError(res, err);
  }
};

export const getUsersByProgramId = async (req: Request, res: Response) => {
  const programId = req.params.programId;
  try {
    const result = await repository.getUsersByProgramId(programId);
    return handleSuccess(res, result);
  } catch (err) {
    return handleError(res, err);
  }
  
};

export const searchUsers = async (req: Request, res: Response): Promise<Response> => {
  const searchData = req.body;
  try {
      const searchResult = await repository.searchUser(searchData);
      const perPage = searchData.perPage ? searchData.perPage : 10;
      const result = paginationHandler(searchResult, searchData.page, perPage);
      return handleSuccess(res, result);
  } catch (error) {
      return handleError(res, error);
  }
};
