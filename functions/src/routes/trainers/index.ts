import { Router } from "express";
import workoutRoutes from "./_workout.route";
import exerciseRoutes from "./_exercise.route";
import goalRoutes from "./_goal.route";

const routes = Router();

routes.use("/workout", workoutRoutes);
routes.use("/exercise", exerciseRoutes);
routes.use("/goal", goalRoutes);
export default routes;