import { Router } from "express";
// import authMiddleware from "../../middleware/auth";
// import roleMiddleware from "../../middleware/role";
import * as controller from "../../controllers/workout.ctrl";
import * as validator from "../../validators/workout.validator";
// import { IUserRoleType } from "../../interfaces/user";

const routes = Router();

routes.get(
    "/:workoutId",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getWorkout,
    controller.getWorkout
);

routes.get(
    "/",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getWorkout,
    controller.getAllWorkouts
);

routes.post(
    "/search",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getWorkout,
    controller.searchWorkouts
);

export default routes;