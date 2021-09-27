import { Router } from 'express';
import authMiddleware from '../../middleware/auth';
import roleMiddleware from '../../middleware/role';
import * as controller from '../../controllers/goal.ctrl';
// import * as validator from '../../validators/goal.validator';
import { IUserRoleType } from '../../utils/enumeration';

const routes = Router();

routes.post(
    '/',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    controller.createGoal
);

routes.put(
    '/',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    // validator.getGoal,
    controller.updateGoal
);

routes.delete(
    '/:memberId/:goalId',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    // validator.getGoal,
    controller.deleteGoal
);

routes.get(
    '/:memberId/:goalId',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    // validator.getGoal,
    controller.getGoal
);

routes.get(
    '/:memberId',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    // validator.getGoal,
    controller.getAllGoals
);

export default routes;