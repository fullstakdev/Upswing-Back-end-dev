import { Request, Response } from 'express';
// import { matchedData } from 'express-validator';
import { buildErrObject, handleError, handleSuccess } from '../utils';
import repository from '../repositories/goal.repo';
import { IGoal } from '../interfaces/goal';

export const createGoal = async (req: Request, res: Response): Promise<Response> => {
  const params: IGoal = req.body.data;
  try {
    const result = await repository.createGoal(params);
    if (!result.id) {
      throw buildErrObject(500, result);
    }
    params.id = result.id;
    return handleSuccess(res, { docs: { ...params } });
  } catch (error) {
    return handleError(res, JSON.parse(error));
  }
};

export const updateGoal = async (req: Request, res: Response): Promise<Response> => {
  const params: IGoal = req.body.data;
  // const data = matchedData(req);
  try {
    const result = await repository.updateGoal(params);
    if (!result) {
        throw buildErrObject(500, result);
    }
    return handleSuccess(res, params);
} catch (error) {
    return handleError(res, JSON.parse(error));
}
};

export const deleteGoal = async (req: Request, res: Response): Promise<Response> => {
  const goalId = req.params.goalId;
  const memberId = req.params.memberId;
  // const data = matchedData(req);
  try {
    const result = await repository.deleteGoal(memberId, goalId);
    if (!result) {
        throw buildErrObject(500, result);
    }
    result.id = goalId;
    result.memberId = memberId;
    return handleSuccess(res, result);
  } catch (error) {
      return handleError(res, JSON.parse(error));
  }
};

export const getGoal = async (req: Request, res: Response): Promise<Response> => {
  const goalId = req.params.goalId;
  const memberId = req.params.memberId;
  // const data = matchedData(req);
  try {
    const result = await repository.getGoal(memberId, goalId);
    if (!result) {
        throw buildErrObject(500, result);
    }
    result.id = goalId;
    result.memberId = memberId;
    return handleSuccess(res, result);
  } catch (error) {
      return handleError(res, JSON.parse(error));
  }
};

export const getAllGoals = async (req: Request, res: Response): Promise<Response> => {
  const memberId = req.params.memberId;
  try {
    const snapsResults = await repository.getGoals(memberId);
    if (!snapsResults) {
        throw buildErrObject(500, snapsResults);
    }
    const allGoals: any = [];
    let row = 0;
    snapsResults.forEach((doc: any) => {
        const goal = doc.data();
        goal.id = doc.id;
        goal.memberId = memberId;
        allGoals.push(goal);
        row++;
    });
    const result = {
        docs: allGoals,
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
    return handleError(res, JSON.parse(error));
  }
};
