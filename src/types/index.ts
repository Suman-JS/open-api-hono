import type { OpenAPIHono } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

export type AppBindings = {
  Variables: {
    logger: PinoLogger;
    clientPlatform: "WEB" | "APP" | "TEST" | "DOC" | (string & {});
  };
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;
