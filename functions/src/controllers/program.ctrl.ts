import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { IProgram } from '../interfaces';
import { handleError, handleSuccess, buildErrObject, paginationHandler } from '../utils';
import { COLLECTION_PROGRAM } from '../utils/constants';
import { IUserRoleType } from '../utils/enumeration';
import { createItem, updateItem, deleteItemById, getItemById, getAllPaginatedItems } from '../repositories/common.repo';
import repository from '../repositories/program.repo';
import userRepository from '../repositories/user.repo';

export const createProgram = async (req: Request, res: Response): Promise<Response> => {
    const params: IProgram = req.body;
    try {
        const result = await createItem(COLLECTION_PROGRAM, params );
        if (!result.id) {
          throw buildErrObject(500, result);
        }
        params.id = result.id;
        return handleSuccess(res, { docs: { ...params } });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateProgram = async (req: Request, res: Response): Promise<Response> => {
    const programId = req.body.id;
    const params: any = req.body.data;
    try {
        // TODO: Uncomment when validation is implemented and replace data below with cleanData
        // const cleanData = matchedData(data);
        const result = await updateItem(COLLECTION_PROGRAM, programId, params);
        if (!result) {
            throw buildErrObject(500, result);
        }
        params.id = programId;
        return handleSuccess(res, { docs: { ...params } });
    } catch (error) {
        return handleError(res, error);
    }
};

export const deleteProgram = async (req: Request, res: Response): Promise<Response> => {
    const programId = req.params.programId;
    try {
        const data = matchedData(req);
        const result = await deleteItemById(COLLECTION_PROGRAM, programId);
        if (result && result.name) {
            result.id = data.programId;
            return handleSuccess(res, result);
        }
        throw buildErrObject(500, result);
    } catch (error) {
        return handleError(res, error);
    }
};

export const searchPrograms = async (req: Request, res: Response): Promise<Response> => {
    const searchData = req.body;
    try {
        const searchResult = await repository.searchProgram(searchData);
        const perPage = searchData.perPage ? searchData.perPage : 10;
        const result = paginationHandler(searchResult, searchData.page, perPage);
        return handleSuccess(res, result);
    } catch (error) {
        return handleError(res, error);
    }
};

export const getProgram = async (req: Request, res: Response): Promise<Response> => {
    const programId = req.params.programId;
    // const data = matchedData(req);
    try {
        const result = await getItemById(COLLECTION_PROGRAM, programId);
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
    const page: number = req.query.page ? Number(req.query.page) : 1;
    const perPage: number = req.query.limit ? Number(req.query.limit) : 10;
    const sort: string = req.query.sort ? String(req.query.sort) : 'createdAt';
  
    const options = {
      page: page,
      limit: perPage,
      sort: sort,
    };
  
    try {
      const result = await getAllPaginatedItems(COLLECTION_PROGRAM, options);
      return handleSuccess(res, result);
    } catch (error) {
      return handleError(res, error);
    }
  };

export const getProgramsByTrainerId = async (req: Request, res: Response): Promise<Response> => {
    const trainerId = req.params.trainerId;
    try {
        const result = await repository.getProgramsByUserId(IUserRoleType.TRAINER, trainerId);
        if (result) {
            return handleSuccess(res, result);
        }
        throw buildErrObject(500, result);
    } catch (error) {
        return handleError(res, error);
    }
}

export const getProgramsByMemberId = async (req: Request, res: Response): Promise<Response> => {
    const memberId = req.params.memberId;
    try {
        const result = await repository.getProgramsByUserId(IUserRoleType.MEMBER, memberId);
        if (result) {
            return handleSuccess(res, result);
        }
        throw buildErrObject(500, result);
    } catch (error) {
        return handleError(res, error);
    }
}

export const getUsersByProgramId = async (req: Request, res: Response): Promise<Response> => {
    const programId = req.params.programId;
    try {
        const result = await getItemById(COLLECTION_PROGRAM, programId);
        if (result && result.name) {
            result.id = programId;
            console.log('members in program', result.memberIds);
            const users = await userRepository.getUsersByMemberIds(result.memberIds);
            result.members = users;
            return handleSuccess(res, result);
        }
        throw buildErrObject(500, result);
    } catch (error) {
        return handleError(res, error);
    }
}

export const getProgramsByStatus = async (req: Request, res: Response): Promise<Response> => {

    try {
        return handleSuccess(res, {});
    } catch (error) {
        return handleError(res, error);
    }
}