import { z } from "@hono/zod-openapi";

export const clientPlatformHeaders = z.object({
  "X-Client-Platform": z
    .enum(["WEB", "APP", "TEST", "DOC"])
    .optional()
    .openapi({
      description:
        "Client platform identifier. Defaults to WEB if not provided.",
      example: "WEB",
    }),
});
