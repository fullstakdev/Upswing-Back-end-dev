import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { handleValidation } from '../utils';

export const getWorkoutValidate = [
    check('workoutId')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('workoutId param is missing.'),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];
