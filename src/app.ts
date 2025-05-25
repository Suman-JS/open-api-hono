import configureOpenAPI from "@/lib/configure-openapi";
import createApp from "@/lib/create-app";

import index from "@/routes/index.route";

export const app = createApp();

const routes = [index] as const;

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/api/v1", route);
});
