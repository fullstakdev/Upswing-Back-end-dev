import { Router } from 'express';
import workoutRoutes from './_workout.route';
import exerciseRoutes from './_exercise.route';
import goalRoutes from './_goal.route';
import programRoutes from './_program.route';

const routes = Router();

routes.use('/workout', workoutRoutes);
routes.use('/exercise', exerciseRoutes);
routes.use('/goal', goalRoutes);
routes.use('/program', programRoutes);
export default routes;