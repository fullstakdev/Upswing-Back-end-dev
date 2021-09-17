import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { handleValidation } from '../utils';

export const getProgram = [
    check('programId')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('programId param is missing.'),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];
