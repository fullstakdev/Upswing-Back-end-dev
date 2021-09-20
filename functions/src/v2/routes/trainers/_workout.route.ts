import { Router } from 'express';
const routes = Router();
import authMiddleware from '../../middleware/auth';
import roleMiddleware from '../../middleware/role';
import * as controller from '../../controllers/workout.ctrl';
import * as validator from '../../validators/workout.validator';
import { IUserRoleType } from '../../interfaces/user';

routes.get(
    '/',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    validator.getWorkouts,
    controller.getWorkouts
);

routes.get(
    '/:workoutId',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    validator.getWorkout,
    controller.getWorkout
);

routes.delete(
    '/:workoutId',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    validator.deleteWorkout,
    controller.deleteWorkout
);

routes.post(
    '/',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    validator.createWorkout,
    controller.createWorkout
);

routes.put(
    '/',
    authMiddleware,
    roleMiddleware(IUserRoleType.TRAINER),
    validator.updateWorkout,
    controller.updateWorkout
);

export default routes;
