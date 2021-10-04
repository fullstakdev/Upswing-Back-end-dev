import { Router } from 'express';
import authMiddleware from '../middleware/auth';
// import roleMiddleware from '../middleware/role';
import * as controller from '../controllers/user.ctrl';
import * as validator from '../validators/user.validator';
// import { IUserRoleType } from '../utils/enumeration';

const routes = Router();

routes.post(
    '/',
    authMiddleware,
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
    // roleMiddleware(IUserRoleType.ADMIN),
    validator.deleteUser,
    controller.deleteUser
);

routes.get(
    '/',
    authMiddleware,
    // roleMiddleware(IUserRoleType.ADMIN),
    controller.getAllUsers
);

routes.get(
    '/:userId',
    authMiddleware,
    validator.getUser,
    controller.getUser
);

routes.get(
    '/clients/:trainerId',
    authMiddleware,
    // validator.getUser,
    controller.getUser
);

routes.get(
    '/program/:programId',
    authMiddleware,
    // validator.getUser,
    controller.getUsersByProgramId
);

routes.post(
    '/search',
    authMiddleware,
    controller.searchUsers
);

export default routes;