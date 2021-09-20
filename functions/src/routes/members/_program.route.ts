import { Router } from "express";
import authMiddleware from "../../middleware/auth";
import roleMiddleware from "../../middleware/role";
import * as controller from "../../controllers/program.ctrl";
import * as validator from "../../validators/program.validator";
import { IUserRoleType } from "../../interfaces/user";

const routes = Router();

routes.get(
    "/",
    authMiddleware,
    roleMiddleware(IUserRoleType.MEMBER),
    controller.getAllPrograms
);

routes.get(
    "/{programId}",
    authMiddleware,
    roleMiddleware(IUserRoleType.MEMBER),
    validator.getProgram,
    controller.getProgram
);

export default routes;
