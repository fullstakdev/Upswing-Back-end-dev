import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { handleValidation } from '../utils';

export const createExercise = [
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];

export const updateExercise = [
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];

export const getExercise = [
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

export const deleteExercise = [
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
