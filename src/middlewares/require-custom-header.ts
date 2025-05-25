import type { AppBindings } from "@/types";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import * as HttpStatusCode from "stoker/http-status-codes";
import { rawPino } from "@/middlewares/pino-logger";

const VALID_PLATFORMS = ["WEB", "APP", "TEST", "DOC"] as const;
const DEFAULT_PLATFORM = "WEB";

export const requireCustomHeader = createMiddleware<AppBindings>(
  async (c, next) => {
    let clientPlatform = c.req.header("X-Client-Platform");

    if (!clientPlatform) {
      clientPlatform = DEFAULT_PLATFORM;
    }

    if (!VALID_PLATFORMS.includes(clientPlatform as any)) {
      throw new HTTPException(HttpStatusCode.BAD_REQUEST, {
        message: `Invalid X-Client-Platform value. Must be one of: ${VALID_PLATFORMS.join(", ")}`,
      });
    }

    c.set("clientPlatform", clientPlatform);
    rawPino.child({
      clientPlatform,
    });

    await next();
  },
);
