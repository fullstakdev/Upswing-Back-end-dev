import { Router } from "express";
// import authMiddleware from "../../middleware/auth";
// import roleMiddleware from "../../middleware/role";
import * as controller from "../../controllers/workout.ctrl";
import * as validator from "../../validators/workout.validator";
// import { IUserRoleType } from "../../interfaces/user";

const routes = Router();

routes.post(
    "/",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    controller.createWorkout
);

routes.put(
    "/",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getWorkoutValidate,
    controller.updateWorkout
);

routes.delete(
    "/",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getWorkoutValidate,
    controller.deleteWorkout
);

routes.get(
    "/{workoutId}",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getWorkoutValidate,
    controller.getWorkout
);

routes.post(
    "/list",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getWorkoutValidate,
    controller.getWorkouts
);

export default routes;