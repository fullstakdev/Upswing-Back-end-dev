import { Router } from 'express';
const routes = Router();
import * as controller from '../controllers/user.ctrl';
import * as validator from '../validators/user.validator';
import authMiddleware from '../middleware/auth';
import roleMiddleware from '../middleware/role';
import { IUserRoleType } from '../interfaces/user';

routes.get(
    '/:userId',
    validator.getUser,
    controller.getUser
);

routes.get(
    '/',
    authMiddleware,
    roleMiddleware(IUserRoleType.ADMIN),
    controller.getUsers
);

routes.post(
    '/',
    validator.createUser,
    controller.createUser
);

routes.put(
    '/',
    authMiddleware,
    validator.updateUser,
    controller.updateUser
);

routes.delete(
    '/:userId',
    authMiddleware,
    roleMiddleware(IUserRoleType.ADMIN),
    validator.deleteUser,
    controller.deleteUser
);

export default routes;
