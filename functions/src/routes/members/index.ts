import { Router } from 'express';
import programRoutes from './_program.route';
import workoutRoutes from './_workout.route';
import goalRoutes from './_goal.route';
import exerciseRoutes from './_exercise.route';

const routes = Router();

routes.use('/programs', programRoutes);
routes.use('/workouts', workoutRoutes);
routes.use('/goals', goalRoutes);
routes.use('/exercises', exerciseRoutes);

export default routes;