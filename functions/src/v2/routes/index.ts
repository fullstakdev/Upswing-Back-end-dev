import { Router } from 'express';
import memberRoutes from './members';
import trainerRoutes from './trainers';
import marketRoutes from './_market.route';
import commonRoutes from './_common.route';
const routes = Router();

routes.use('/m', memberRoutes);

routes.use('/t', trainerRoutes);

routes.use('/markets', marketRoutes);

routes.use('/common', commonRoutes);

export default routes;
