import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCode from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { createRouter } from "@/lib/create-app";

const router = createRouter().openapi(
  createRoute({
    tags: ["root"],
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCode.OK]: jsonContent(
        createMessageObjectSchema("Tasks API"),
        "Task API index",
      ),
    },
  }),
  (c) => {
    return c.json({
      message: "Task API",
    });
  },
);

export default router;
