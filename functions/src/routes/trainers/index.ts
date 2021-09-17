import { Router } from 'express';
import workoutRoutes from './_workout.route';
import exerciseRoutes from './_exercise.route';
const routes = Router();

routes.use('/workout', workoutRoutes);
routes.use('/exercise', exerciseRoutes);
export default routes;