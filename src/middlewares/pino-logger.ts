import { pinoLogger as honoPinoLogger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

import { env } from "@/env";

export const rawPino = pino(
  {
    level: env.LOG_LEVEL || "info",
  },
  env.NODE_ENV === "production" ? undefined : pretty(),
);

export function pinoLogger() {
  return honoPinoLogger({
    pino: rawPino,
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
