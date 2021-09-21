import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { handleValidation } from '../utils';

export const createGoal = [
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];

export const updateGoal = [
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];

export const deleteGoal = [
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
