import { Router } from 'express';
// import authMiddleware from '../middleware/auth';
// import roleMiddleware from '../middleware/role';
import * as controller from '../controllers/user.ctrl';
import * as validator from '../validators/user.validator';
// import { IUserRoleType } from '../interfaces/user';

const routes = Router();

routes.post(
    '/',
    // authMiddleware,
    validator.createUser,
    controller.createUser
);

routes.put(
    '/',
    // authMiddleware,
    validator.updateUser,
    controller.updateUser
);

routes.delete(
    '/:userId',
    // authMiddleware,
    // roleMiddleware(IUserRoleType.ADMIN),
    validator.deleteUser,
    controller.deleteUser
);

routes.get(
    '/:userId',
    // authMiddleware,
    validator.getUser,
    controller.getUser
);

routes.get(
    '/',
    // authMiddleware,
    // roleMiddleware(IUserRoleType.ADMIN),
    controller.getAllUsers
);

routes.post(
    '/search',
    // authMiddleware,
    // validator.getUser,
    controller.searchUsers
);

export default routes;