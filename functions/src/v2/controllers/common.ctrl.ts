import { Request, Response } from 'express';
import { handleError, handleSuccess } from '../utils';

export const uploadFiles = async (req: Request, res: Response) => {
    try {
        return handleSuccess(res, { msg: 'url' });
    } catch (error) {
        return handleError(res, error);
    }
}
;
