import { Router } from "express";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";

const routes = Router();

routes.use("/api/v1/users", UserRoutes);
routes.use("/api/v1/auth", AuthRoutes);

export default routes;