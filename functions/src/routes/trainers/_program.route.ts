import { Router } from "express";
// import authMiddleware from "../../middleware/auth";
// import roleMiddleware from "../../middleware/role";
import * as controller from "../../controllers/program.ctrl";
import * as validator from "../../validators/program.validator";
// import { IUserRoleType } from "../../interfaces/user";

const routes = Router();

routes.post(
    "/",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    controller.createProgram
);

routes.put(
    "/",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    // validator.getProgram,
    controller.updateProgram
);

routes.delete(
    "/:programId",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    // validator.getProgram,
    controller.deleteProgram
);

routes.get(
    "/:programId",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getProgram,
    controller.getProgram
);

routes.get(
    "/",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    // validator.getProgram,
    controller.getAllPrograms
);

routes.post(
    "/search",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    // validator.getProgramValidate,
    controller.searchPrograms
);

export default routes;