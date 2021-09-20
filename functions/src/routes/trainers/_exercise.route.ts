import { Router } from "express";
// import authMiddleware from "../../middleware/auth";
// import roleMiddleware from "../../middleware/role";
import * as controller from "../../controllers/exercise.ctrl";
import * as validator from "../../validators/exercise.validator";
// import { IUserRoleType } from "../../interfaces/user";

const routes = Router();

routes.post(
    "/",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.createExercise,
    controller.createExercise
);

routes.put(
    "/",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.updateExercise,
    controller.updateExercise
);

routes.delete(
    "/:exerciseId",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.deleteExercise,
    controller.deleteExercise
);

routes.get(
    "/:exerciseId",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getExercise,
    controller.getExercise
);

routes.get(
    "/",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    controller.getAllExercises
);

routes.post(
    "/search",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    controller.searchExercises
);

export default routes;