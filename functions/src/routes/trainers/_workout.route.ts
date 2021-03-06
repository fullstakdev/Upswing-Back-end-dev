import { Router } from 'express';
import authMiddleware from '../../middleware/auth';
import roleMiddleware from '../../middleware/role';
import * as controller from '../../controllers/workout.ctrl';
import * as validator from '../../validators/workout.validator';
import { IUserRoleType } from '../../utils/enumeration';

const routes = Router();

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
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.updateWorkout,
    controller.updateWorkout
);

routes.delete(
    '/:workoutId',
    authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.deleteWorkout,
    controller.deleteWorkout
);

routes.get(
    '/',
    authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getWorkouts,
    controller.getAllWorkouts
);

routes.get(
    '/:workoutId',
    authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getWorkout,
    controller.getWorkout
);

routes.get(
    '/program/:programId',
    authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    controller.getWorkoutByProgramId
);

routes.post(
    '/search',
    authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getWorkouts,
    controller.searchWorkouts
);

export default routes;