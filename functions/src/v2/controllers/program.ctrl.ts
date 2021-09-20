import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { handleError, handleSuccess } from '../utils';
import repository from '../repositories/program.repo';

export const getPrograms = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data = matchedData(req);
        const programs = await repository.getPrograms(data);
        return handleSuccess(res, programs);
    } catch (error) {
        return handleError(res, error);
    }
};

export const getProgram = (req: Request, res: Response): Promise<Response> => {
    try {
        const data = matchedData(req);
        return handleSuccess(res, data);
    } catch (error) {
        return handleError(res, error);
    }
};
