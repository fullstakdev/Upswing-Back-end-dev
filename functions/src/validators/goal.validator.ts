import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { handleValidation } from '../utils';

export const getGoal = [
    check('goalId')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('goalId param is missing.'),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];
