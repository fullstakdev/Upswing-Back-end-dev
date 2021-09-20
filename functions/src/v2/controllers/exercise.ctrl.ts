import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { buildErrObject, handleError, handleSuccess } from '../utils';
import repository from '../repositories/exercise.repo';
import { IExercise } from '../interfaces';

export const createExercise = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data: IExercise = req.body.data;
        // TODO: Uncomment when validation is implemented and replace data below with cleanData
        // const cleanData = matchedData(data);
        const result = await repository.createExercise(data);
        if (!result.id) {
            throw buildErrObject(500, result);
        }
        data.id = result.id;
        return handleSuccess(res, { docs: { ...data } });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getExercise = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data = matchedData(req);
        const result = await repository.getExercise(data.exerciseId);
        if (result && result.name) {
            result.id = data.exerciseId;
            return handleSuccess(res, result);
        }
        throw buildErrObject(500, result);
    } catch (error) {
        return handleError(res, error);
    }
};

export const deleteExercise = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data = matchedData(req);
        const result = await repository.deleteExercise(data.exerciseId);
        if (result && result.name) {
            result.id = data.exerciseId;
            return handleSuccess(res, result);
        }
        throw buildErrObject(500, result);
    } catch (error) {
        return handleError(res, error);
    }
};

export const getExercises = async (req: Request, res: Response): Promise<Response> => {
    try {
        const snapsResults = await repository.getExercises();

        if (!snapsResults) {
            throw buildErrObject(500, snapsResults);
        }
        const allExercises: any = [];
        let row = 0;
        snapsResults.forEach((doc: any) => {
            const exercise = doc.data();
            exercise['id'] = doc.id;
            allExercises.push(exercise);
            row++;
        });
        const result = {
            docs: allExercises,
            limit: 10,
            page: 1,
            totalPages: 1,
            totalDocs: row,
            hasPrevPage: false,
            hasNextPage: false,
            prevPage: 0,
            nextPage: 0,
        };

        return handleSuccess(res, result);
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateExercise = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data: IExercise = req.body.data;
        const exerciseId: string = req.body.exerciseId;
        // TODO: Uncomment when validation is implemented and replace data below with cleanData
        // const cleanData = matchedData(data);
        const result = await repository.updateExercise(data, exerciseId);
        if (!result) {
            throw buildErrObject(500, result);
        }
        data.id = exerciseId;
        return handleSuccess(res, data);
    } catch (error) {
        return handleError(res, error);
    }
};
