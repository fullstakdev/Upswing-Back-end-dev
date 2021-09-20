import { Router } from 'express';
import workoutRoute from './_workout.route';
import exerciseRoute from './_exercise.route';
const routes = Router();

routes.use('/workouts', workoutRoute);
routes.use('/exercises', exerciseRoute);

export default routes;
