import { createRouter } from "../../lib/router";
import * as handlers from "./handler";
import * as routes from "./routes";

export const userRoutes = createRouter()
  .openapi(routes.getUsers, handlers.getUsers)
  .openapi(routes.getUserById, handlers.getUserById);
