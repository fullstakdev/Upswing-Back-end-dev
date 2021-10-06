import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { handleValidation } from '../utils';

export const createUser = [
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];

export const addProgramsInUser = [
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];

export const addGoalsInUser = [
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];

export const updateUser = [
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];

export const deleteUser = [
    check('userId')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('userid param is missing.'),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];

export const getUser = [
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];

export const getUsersByTrainerId = [
    check('trainerId')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('trainerId param is missing.'),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidation(req, res, next);
    },
];

export const getUsersByProgramId = [
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