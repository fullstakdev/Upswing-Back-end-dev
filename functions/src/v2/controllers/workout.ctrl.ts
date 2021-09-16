import {Request, Response} from 'express';

export const createWorkout = (req: Request, res: Response) => {
    const params = req.body.data;

    res.status(200).json(params);
};