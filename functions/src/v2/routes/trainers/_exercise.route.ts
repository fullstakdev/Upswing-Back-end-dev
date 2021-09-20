import { Router } from 'express';
const routes = Router();
import authMiddleware from '../../middleware/auth';
import roleMiddleware from '../../middleware/role';
import * as controller from '../../controllers/exercise.ctrl';
import * as validator from '../../validators/exercise.validator';
import { IUserRoleType } from '../../interfaces/user';

routes.post(
    '/',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    validator.createExercise,
    controller.createExercise
);

routes.get(
    '/:exerciseId',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    validator.getExercise,
    controller.getExercise
);

routes.get(
    '/',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    controller.getExercises
);

routes.put(
    '/',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    validator.updateExercise,
    controller.updateExercise
);

routes.delete(
    '/:exerciseId',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    validator.deleteExercise,
    controller.deleteExercise
);

export default routes;
