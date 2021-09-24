import { Request, Response } from 'express';
// import { matchedData } from 'express-validator';
import { buildErrObject, handleError, handleSuccess, paginationHandler } from '../utils';
import { IUser } from '../interfaces';
import { COLLECTION_USER } from '../utils/constants';
import { createItem, updateItem, deleteItemById, getItemById, getAllItems } from '../repositories/common.repo';
import repository from '../repositories/user.repo';
// import { getAllPaginatedItems } from '../repositories/common.repo';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const params: IUser = req.body.data;
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

export const getAllUsers = async(req: Request, res: Response): Promise<Response> => {
  const page = req.body.page ? req.body.page : 1;
  const perPage = req.body.perpage ? req.body.page : 10;
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
    const result = paginationHandler(allUsers, page, perPage);

    return handleSuccess(res, result);
  } catch (error) {
      return handleError(res, error);
  }
}

// export const getAllUsers = async (req: Request, res: Response) => {
//   // testing
//   const condition = {
//     key: 'role',
//     operator: '==',
//     value: 'trainer',
//   };
//   const options = {
//     page: 1,
//     limit: 10,
//     sort: 'createdAt',
//   };

//   try {
//     const result = await getAllPaginatedItems(COLLECTION_USER, condition, options);
//     return handleSuccess(res, result);
//   } catch (error) {
//     return handleError(res, error);
//   }
// };

export const searchUsers = async (req: Request, res: Response): Promise<Response> => {
  const searchData = req.body.data;
  try {
      const searchResult = await repository.searchUser(searchData);
      const perPage = searchData.perPage ? searchData.perPage : 10;
      const result = paginationHandler(searchResult, searchData.page, perPage);
      return handleSuccess(res, result);
  } catch (error) {
      return handleError(res, error);
  }
};
