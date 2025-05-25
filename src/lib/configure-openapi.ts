import type { AppOpenAPI } from "@/types";

import { Scalar } from "@scalar/hono-api-reference";
import packageJson from "../../package.json";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJson.version,
      title: "Task API",
    },
  });

  app.get(
    "/reference",
    Scalar(() => {
      return {
        url: "/doc",
        theme: "elysiajs",
        darkMode: true,
        pageTitle: "Task API Reference",
        layout: "modern",
        defaultHttpClient: {
          targetKey: "js",
          clientKey: "fetch",
        },
      };
    }),
  );
}
