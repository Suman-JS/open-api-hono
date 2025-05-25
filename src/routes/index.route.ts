import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCode from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { createRouter } from "@/lib/create-app";
import { clientPlatformHeaders } from "@/schemas/common-header";

const router = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    request: {
      headers: clientPlatformHeaders,
    },
    responses: {
      [HttpStatusCode.OK]: jsonContent(
        createMessageObjectSchema("Tasks API"),
        "Task API index",
      ),
      [HttpStatusCode.BAD_REQUEST]: jsonContent(
        createMessageObjectSchema("Missing required header"),
        "Missing X-Client-Platform header",
      ),
    },
  }),
  (c) => {
    c.var.logger.info("Index route accessed");
    return c.json({
      message: "Task API",
    });
  },
);

export default router;
