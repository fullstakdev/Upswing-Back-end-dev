import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { buildErrObject, handleError, handleSuccess } from '../utils';
import repository from '../repositories/user.repo';
import { IUser } from '../interfaces';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data: IUser = req.body.data;
        // TODO: Uncomment when validation is implemented and replace data below with cleanData
        // const cleanData = matchedData(data);
        const result = await repository.createUser(data);
        if (result && result.id) {
            data.id = result.id;
            return handleSuccess(res, data);
        }
        throw buildErrObject(500, result);
    } catch (error) {
        return handleError(res, error);
    }
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data = matchedData(req);
        const result = await repository.getUser(data.userId);
        if (!result) {
            throw buildErrObject(500, result);
        }
        result.id = data.userId;
        return handleSuccess(res, result);
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data: IUser = req.body.data;
        const userId: string = req.body.userId;
        // TODO: Uncomment when validation is implemented and replace data below with cleanData
        // const cleanData = matchedData(data);
        const result = await repository.updateUser(data, userId);
        if (!result) {
            throw buildErrObject(500, result);
        }
        data.id = userId;
        return handleSuccess(res, data);
    } catch (error) {
        return handleError(res, error);
    }
};

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const snapsResults = await repository.getUsers();

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


export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data = matchedData(req);
        const result = await repository.deleteUser(data.userId);
        if (result && result.email) {
            result.id = data.userId;
            return handleSuccess(res, result);
        }
        throw buildErrObject(500, result);
    } catch (error) {
        return handleError(res, error);
    }
};
