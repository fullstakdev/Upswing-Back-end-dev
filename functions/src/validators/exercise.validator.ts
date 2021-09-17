import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { handleValidation } from '../utils';

export const getExerciseValidate = [
    check('exerciseId')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('exerciseId param is missing.'),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];
