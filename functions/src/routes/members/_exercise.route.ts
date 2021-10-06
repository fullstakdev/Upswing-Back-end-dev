import { Router } from 'express';
import authMiddleware from '../../middleware/auth';
// import roleMiddleware from '../../middleware/role';
import * as controller from '../../controllers/exercise.ctrl';
import * as validator from '../../validators/exercise.validator';
// import { IUserRoleType } from '../../utils/enumeration';

const routes = Router();

routes.get(
    '/:exerciseId',
    authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getExercise,
    controller.getExercise
);

routes.get(
    '/',
    authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    controller.getAllExercises
);

routes.get(
    '/',
    authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    controller.getAllExercisesByWorkoutId
)

routes.post(
    '/search',
    authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    controller.searchExercises
);

export default routes;