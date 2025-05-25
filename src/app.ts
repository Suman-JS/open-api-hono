import configureOpenAPI from "@/lib/configure-openapi";
import createApp from "@/lib/create-app";

import index from "@/routes/index.route";
import tasks from "@/routes/tasks/tasks.index";

export const app = createApp();

const routes = [index, tasks] as const;

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});
