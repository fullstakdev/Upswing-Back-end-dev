import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { buildErrObject, handleError, handleSuccess } from '../utils';
import repository from '../repositories/workout.repo';
import { IWorkout } from '../interfaces';

export const createWorkout = async (req: Request, res: Response) => {
    try {
        const data: IWorkout = req.body.data;
        // TODO: Uncomment when validation is implemented and replace data below with cleanData
        // const cleanData = matchedData(data);
        const result = await repository.createWorkout(data);
        if (!result.id) {
            throw buildErrObject(500, result);
        }
        data.id = result.id;
        return handleSuccess(res, { docs: { ...data } });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getWorkout = async (req: Request, res: Response) => {
    try {
        const data = matchedData(req);
        const result = await repository.getWorkout(data.workoutId);
        if (!result) {
            throw buildErrObject(500, result);
        }
        result.id = data.workoutId;
        return handleSuccess(res, result);
    } catch (error) {
        return handleError(res, error);
    }
};

export const getWorkouts = async (req: Request, res: Response) => {
    try {
        // TODO: Uncomment when validation is implemented and replace data below with cleanData
        // const cleanData = matchedData(data);
        const snapsResults = await repository.getWorkouts();

        if (!snapsResults) {
            throw buildErrObject(500, snapsResults);
        }
        const allWorkouts: any = [];
        let row = 0;
        snapsResults.forEach((doc: any) => {
            const workout = doc.data();
            workout['workoutId'] = doc.id;
            allWorkouts.push(workout);
            row++;
        });
        const result = {
            docs: allWorkouts,
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

export const deleteWorkout = async (req: Request, res: Response) => {
    try {
        const data = matchedData(req);
        const result = await repository.deleteWorkout(data.workoutId);
        if (!result) {
            throw buildErrObject(500, result);
        }
        result.id = data.workoutId;
        return handleSuccess(res, result);
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateWorkout = async (req: Request, res: Response) => {
    try {
        const data: IWorkout = req.body.data;
        const workoutId: string = req.body.workoutId;
        // TODO: Uncomment when validation is implemented and replace data below with cleanData
        // const cleanData = matchedData(data);
        const result = await repository.updateWorkout(data, workoutId);
        if (!result) {
            throw buildErrObject(500, result);
        }
        data.id = workoutId;
        return handleSuccess(res, data);
    } catch (error) {
        return handleError(res, error);
    }
};
