import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { IProgram } from "../interfaces";
import { handleError, handleSuccess, buildErrObject } from "../utils";
import { COLLECTION_PROGRAM } from "../utils/constants";
import { createData, updateData, deleteDataById, getDataById, getAllDatas } from "../repositories/common.repo";

export const createProgram = async (req: Request, res: Response): Promise<Response> => {
    const params: IProgram = req.body.data;
    try{
        const result = await createData(COLLECTION_PROGRAM, params );
        if (!result.id) {
          throw buildErrObject(500, result);
        }
        params.id = result.id;
        return handleSuccess(res, { docs: { ...params } });
    } catch (error) {
        return handleError(res, error);
    }
}

export const updateProgram = async (req: Request, res: Response): Promise<Response> => {
    const programId = req.body.programId;
    const params:any = req.body.data;
    try {
        // TODO: Uncomment when validation is implemented and replace data below with cleanData
        // const cleanData = matchedData(data);
        const result = await updateData(COLLECTION_PROGRAM, programId, params);
        if (!result) {
            throw buildErrObject(500, result);
        }
        params.id = programId;
        return handleSuccess(res, { docs: { ...params } });
    } catch (error) {
        return handleError(res, error);
    }
}

export const deleteProgram = async (req: Request, res: Response): Promise<Response> => {
    const programId = req.params.programId;
    try {
        const data = matchedData(req);
        const result = await deleteDataById(COLLECTION_PROGRAM, programId);
        if (result && result.name) {
            result.id = data.programId;
            return handleSuccess(res, result);
        }
        throw buildErrObject(500, result);
    } catch (error) {
        return handleError(res, error);
    }
}

export const searchPrograms = async (req: Request, res: Response) => {
    res.status(200).json({'success': "ok"});
}

export const getProgram = async (req: Request, res: Response): Promise<Response> => {
    const programId = req.params.programId;
    // const data = matchedData(req);
    try {
        const result = await getDataById(COLLECTION_PROGRAM, programId);
        if (result && result.name) {
            result.id = programId;
            return handleSuccess(res, result);
        }
        throw buildErrObject(500, result);
    } catch (error) {
        return handleError(res, error);
    }
};

export const getAllPrograms = async (req: Request, res: Response): Promise<Response> => {
    const searchData = req.body.data;
    console.log(searchData);
    try{
        const snapsResults = await getAllDatas(COLLECTION_PROGRAM);
        if (!snapsResults) {
            throw buildErrObject(500, snapsResults);
        }
        const allPrograms: any = [];
        let row = 0;
        snapsResults.forEach((doc: any) => {
            const programs = doc.data();
            programs['id'] = doc.id;
            allPrograms.push(programs);
            row++;
        });
        const result = {
            docs: allPrograms,
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
