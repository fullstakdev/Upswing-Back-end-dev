import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { handleError, handleSuccess } from '../utils';

export const getPrograms = (req: Request, res: Response) => {
    try {
        const data = matchedData(req);
        return handleSuccess(res, data);
    } catch (error) {
        return handleError(res, error);
    }
};

export const getProgram = (req: Request, res: Response) => {
    try {
        const data = matchedData(req);
        return handleSuccess(res, data);
    } catch (error) {
        return handleError(res, error);
    }
};
