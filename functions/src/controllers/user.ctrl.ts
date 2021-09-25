import { Request, Response } from 'express';
// import { matchedData } from 'express-validator';
import { buildErrObject, handleError, handleSuccess } from '../utils';
import { IUser } from '../interfaces';
import { COLLECTION_USER } from '../utils/constants';
import { createItem, updateItem, deleteItemById, getItemById, getAllItems, getAllPaginatedItems } from '../repositories/common.repo';
import { FieldValue } from '..';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const params: IUser = req.body.data;
  const timestamp = FieldValue.serverTimestamp(); // Instead of new Date().getTime()
  params.createdAt = timestamp as unknown as number;
  // TODO: Uncomment when validation is implemented and replace data below with cleanData
  // const cleanData = matchedData(data);
  try {
    const result = await createItem(COLLECTION_USER, params );
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
    const result = await updateItem(COLLECTION_USER, userId, params);
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
  const userId = req.params.userId;
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

export const getAllUsers = async (req: Request, res: Response) => {
  // testing
  const conditions:any = [
    {
      key: 'role',
      operator: '==',
      value: 'trainer',
    },
    {
      key: 'gender',
      operator: '==',
      value: 1,
    },
  ];

  const options = {
    page: 1,
    limit: 10,
    sort: 'createdAt',
  };

  // Testing params from req.body.data
  if (req.body.data) {
    options.limit = req.body.data.limit;
    options.page = req.body.data.page;
    options.sort = req.body.data.sort;
  }

  try {
    const result = await getAllPaginatedItems(COLLECTION_USER, conditions, options);
    return handleSuccess(res, result);
  } catch (error) {
    return handleError(res, error);
  }
};

export const searchUsers = async (req: Request, res: Response): Promise<Response> => {
  const searchData = req.body.data;
  console.log(searchData);
  try {
    const snapsResults = await getAllItems(COLLECTION_USER);
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
