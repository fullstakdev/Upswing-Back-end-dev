import { Router } from 'express';
const routes = Router();
import authMiddleware from '../../middleware/auth';
import roleMiddleware from '../../middleware/role';
import * as controller from '../../controllers/program.ctrl';
import * as validator from '../../validators/program.validator';
import { IUserRoleType } from '../../interfaces/user';

routes.get(
    '/',
    authMiddleware,
    roleMiddleware(IUserRoleType.MEMBER),
    controller.getPrograms
);

routes.get(
    '/{programId}',
    authMiddleware,
    roleMiddleware(IUserRoleType.MEMBER),
    validator.getProgram,
    controller.getProgram
);

export default routes;
