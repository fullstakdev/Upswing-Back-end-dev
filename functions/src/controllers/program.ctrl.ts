import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { handleError, handleSuccess } from "../utils";

export const createProgram = async (req: Request, res: Response) => {
    res.status(200).json({'success': "ok"});
}

export const updateProgram = async (req: Request, res: Response) => {
    res.status(200).json({'success': "ok"});
}

export const deleteProgram = async (req: Request, res: Response) => {
    res.status(200).json({'success': "ok"});
}

export const searchPrograms = async (req: Request, res: Response) => {
    res.status(200).json({'success': "ok"});
}

export const getAllPrograms = (req: Request, res: Response) => {
    try {
        const data = matchedData(req);
        return handleSuccess(res, data);
    } catch (error) {
        return handleError(res, error);
    }
};

export const getProgram = (req: Request, res: Response) => {
    try {
        const data = matchedData(req);
        return handleSuccess(res, data);
    } catch (error) {
        return handleError(res, error);
    }
};