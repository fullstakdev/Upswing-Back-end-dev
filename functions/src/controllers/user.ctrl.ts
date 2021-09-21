import { Request, Response } from 'express';
// import { matchedData } from 'express-validator';
import { buildErrObject, handleError, handleSuccess } from '../utils';
import { IUser } from '../interfaces';
import { COLLECTION_USER } from '../utils/constants';
import { createData, updateData, deleteDataById, getDataById, getAllDatas } from '../repositories/common.repo';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const params: IUser = req.body.data;
  // TODO: Uncomment when validation is implemented and replace data below with cleanData
  // const cleanData = matchedData(data);
  try {
    const result = await createData(COLLECTION_USER, params );
    if (result && result.id) {
        params.id = result.id;
        return handleSuccess(res, params);
    }
    throw buildErrObject(500, result);
  } catch (error) {
      return handleError(res, error);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.body.userId;
  const params:any = req.body.data;
  // TODO: Uncomment when validation is implemented and replace data below with cleanData
  // const cleanData = matchedData(data);
  try {
    const result = await updateData(COLLECTION_USER, userId, params);
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
    const result = await deleteDataById(COLLECTION_USER, userId);
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
  const userId = req.params.userId;
  // const data = matchedData(req);
  try {
    const result = await getDataById(COLLECTION_USER, userId);
    if (!result) {
        throw buildErrObject(500, result);
    }
    result.id = userId;
    return handleSuccess(res, result);
  } catch (error) {
      return handleError(res, error);
  }
};

export const getAllUsers = async(req: Request, res: Response): Promise<Response> => {
  try {
    const snapsResults = await getAllDatas(COLLECTION_USER);
    if (!snapsResults) {
        throw buildErrObject(500, snapsResults);
    }
    const allUsers: any = [];
    let row = 0;
    snapsResults.forEach((doc: any) => {
        const user = doc.data();
        user['id'] = doc.id;
        allUsers.push(user);
        row++;
    });
    const result = {
        docs: allUsers,
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

export const searchUsers = async (req: Request, res: Response): Promise<Response> => {
  const searchData = req.body.data;
  console.log(searchData);
  try {
    const snapsResults = await getAllDatas(COLLECTION_USER);
    if (!snapsResults) {
        throw buildErrObject(500, snapsResults);
    }
    const allUsers: any = [];
    let row = 0;
    snapsResults.forEach((doc: any) => {
        const user = doc.data();
        user['id'] = doc.id;
        allUsers.push(user);
        row++;
    });
    const result = {
        docs: allUsers,
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
