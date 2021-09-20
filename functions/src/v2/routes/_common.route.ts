import { Router } from 'express';
import * as controller from '../controllers/common.ctrl';
import authMiddleware from '../middleware/auth';

const routes = Router();

routes.post(
    '/file',
    authMiddleware,
    controller.uploadFiles
);

export default routes;
