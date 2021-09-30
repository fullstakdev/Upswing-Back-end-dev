import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { handleValidation } from '../utils';

export const createWorkout = [
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];

export const updateWorkout = [
    check('id')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('update workout Id param is missing.'),
    check('data')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('update workout data param is missing.'),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];

export const getWorkouts = [
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];

export const getWorkout = [
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

export const deleteWorkout = [
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
