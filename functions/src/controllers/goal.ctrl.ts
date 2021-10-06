import { Request, Response } from 'express';
// import { matchedData } from 'express-validator';
import { buildErrObject, handleError, handleSuccess, getUserInfoByToken } from '../utils';
import repository from '../repositories/goal.repo';
import { IGoal } from '../interfaces/goal';
import { IGoalStatus } from '../utils/enumeration';

export const createGoal = async (req: Request, res: Response): Promise<Response> => {
  const userInfo = getUserInfoByToken(req);
  const memberId = userInfo.userId;
  const goalName = req.body.name;
  const data = { name: goalName, status: IGoalStatus.PENDING, createdAt: new Date().getTime() };
  try {
    const result = await repository.createGoal(memberId, data);
    if (!result.id) {
      throw buildErrObject(500, result);
    }
    const docs = { id: result.id, name: goalName, status: IGoalStatus.PENDING };
    return handleSuccess(res, { ...docs });
  } catch (error) {
    return handleError(res, JSON.parse(error));
  }
};

export const updateGoal = async (req: Request, res: Response): Promise<Response> => {
  const params: IGoal = req.body.data;
  const goalId: string = req.body.id ? String(req.body.id): '';
  const userInfo = getUserInfoByToken(req);
  const memberId = userInfo.userId;
  // const data = matchedData(req);
  try {
    const result = await repository.updateGoal(memberId, goalId, params);
    if (!result) {
        throw buildErrObject(500, result);
    }
    return handleSuccess(res, result);
  } catch (error) {
      return handleError(res, JSON.parse(error));
  }
};

export const deleteGoal = async (req: Request, res: Response): Promise<Response> => {
  const goalId = req.params.goalId;
  const userInfo = getUserInfoByToken(req);
  const memberId = userInfo.userId;
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

export const setComplete = async (req: Request, res: Response): Promise<Response> => {
  const userInfo: any = getUserInfoByToken(req);
  const memberId: string = userInfo.userId; 
  const goalId: string = req.params.goalId ? String(req.params.goalId) : '';
  const updateData = { status: IGoalStatus.COMPLETE }
  try {
    const result = await repository.updateGoal(memberId, goalId, updateData);
    if (!result) {
      throw buildErrObject(500, result);
    }
    return handleSuccess(res, result);
  } catch (error) {
      return handleError(res, JSON.parse(error));
  }
}
export const getGoal = async (req: Request, res: Response): Promise<Response> => {
  const goalId = req.params.goalId;
  const userInfo = getUserInfoByToken(req);
  const memberId = userInfo.userId;
  // const data = matchedData(req);
  try {
    const result = await repository.getGoal(memberId, goalId);
    if (!result) {
        throw buildErrObject(500, result);
    }
    result.id = goalId;
    return handleSuccess(res, result);
  } catch (error) {
      return handleError(res, JSON.parse(error));
  }
};

export const getAllGoals = async (req: Request, res: Response): Promise<Response> => {
  const userInfo = getUserInfoByToken(req);
  const memberId = userInfo.userId;
  try {
    const snapsResults = await repository.getGoals(memberId);
    if (!snapsResults) {
        throw buildErrObject(500, snapsResults);
    }
    const allGoals: any = [];
    snapsResults.forEach((doc: any) => {
        const goal = doc.data();
        goal.id = doc.id;
        allGoals.push(goal);
    });
    const result = {
        docs: allGoals
    };

    return handleSuccess(res, result);
  } catch (error) {
    return handleError(res, JSON.parse(error));
  }
};
