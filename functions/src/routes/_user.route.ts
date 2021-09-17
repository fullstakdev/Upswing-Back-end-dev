import { Router } from "express";
// import authMiddleware from "../middleware/auth";
// import roleMiddleware from "../middleware/role";
import * as controller from "../controllers/user.ctrl";
import * as validator from "../validators/user.validator";
// import { IUserRoleType } from "../interfaces/user";

const routes = Router();

routes.post(
    "/",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    controller.createUser
);

routes.put(
    "/",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getUserValidate,
    controller.updateUser
);

routes.delete(
    "/",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getUserValidate,
    controller.deleteUser
);

routes.get(
    "/{userId}",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getUserValidate,
    controller.getUser
);

routes.post(
    "/list",
    // authMiddleware,
    // roleMiddleware(IUserRoleType.TRAINER),
    validator.getUserValidate,
    controller.getUsers
);

export default routes;