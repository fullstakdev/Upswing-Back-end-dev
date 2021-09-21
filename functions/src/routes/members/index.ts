import { Router } from 'express';
import programRoutes from './_program.route';
import workoutRoutes from './_workout.route';
const routes = Router();

routes.use('/programs', programRoutes);
routes.use('/workout', workoutRoutes);
export default routes;