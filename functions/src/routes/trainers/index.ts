import { Router } from 'express';
import workoutRoutes from './_workout.route';
import exerciseRoutes from './_exercise.route';
import goalRoutes from './_goal.route';
import programRoutes from './_program.route';

const routes = Router();

routes.use('/workouts', workoutRoutes);
routes.use('/exercises', exerciseRoutes);
routes.use('/goals', goalRoutes);
routes.use('/programs', programRoutes);
export default routes;