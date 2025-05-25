import type { ZodError } from "zod/v4";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  LOG_LEVEL: z.enum([
    "silent",
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
  ]),
  PORT: z.coerce.number().default(8080),
});

export type ENV = z.infer<typeof EnvSchema>;

// eslint-disable-next-line import/no-mutable-exports
let env: ENV;

try {
  // eslint-disable-next-line node/no-process-env
  env = EnvSchema.parse(process.env);
} catch (e) {
  const error = e as ZodError;
  console.error(
    "❌ Server could not be started due to following error :",
    error.flatten().fieldErrors,
  );
  process.exit(1);
}

export { env };
