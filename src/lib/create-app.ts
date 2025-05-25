import type { Schema } from "hono";

import type { AppBindings, AppOpenAPI } from "@/types";
import { OpenAPIHono } from "@hono/zod-openapi";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";

import { prettyJSON } from "hono/pretty-json";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";

import { defaultHook } from "stoker/openapi";
import { pinoLogger } from "@/middlewares/pino-logger";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(compress());
  app.use(serveEmojiFavicon("🔥"));
  app.use(cors());
  app.use(csrf());
  app.use(
    prettyJSON({
      space: 2,
    }),
  );
  app.use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);
  return app;
}

export function createTestApp<S extends Schema>(router: AppOpenAPI<S>) {
  return createApp().route("/", router);
}
