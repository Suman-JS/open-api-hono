import type { AppBindings } from "@/types";

import { OpenAPIHono } from "@hono/zod-openapi";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { prettyJSON } from "hono/pretty-json";

import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import { pinoLogger } from "@/middlewares/pino-logger";
import { requireCustomHeader } from "@/middlewares/require-custom-header";

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
  app.use("*", async (c, next) => {
    if (c.req.path.startsWith("/doc") || c.req.path.startsWith("/reference")) {
      await next();
    } else {
      await requireCustomHeader(c, next);
    }
  });

  app.notFound(notFound);
  app.onError(onError);
  return app;
}
