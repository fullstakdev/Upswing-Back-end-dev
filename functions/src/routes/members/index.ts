import { Router } from "express";
import programRoutes from "./_program.route";
const routes = Router();

routes.use("/programs", programRoutes);

export default routes;