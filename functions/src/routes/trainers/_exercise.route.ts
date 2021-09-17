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
    controller.createExercise
);

routes.put(
    "/",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getExerciseValidate,
    controller.updateExercise
);

routes.delete(
    "/:exerciseId",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getExerciseValidate,
    controller.deleteExercise
);

routes.get(
    "/:exerciseId",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getExerciseValidate,
    controller.getExercise
);

routes.post(
    "/list",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getExerciseValidate,
    controller.getExercise
);

export default routes;