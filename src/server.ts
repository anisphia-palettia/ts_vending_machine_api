import app from "./app";
import { envConf } from "./config/env.conf";

function bootstrap() {
  Bun.serve({
    port: envConf.APP_PORT,
    fetch: app.fetch,
  });
  console.log("Initializing Hono app...");
  console.log(`Server started on port ${envConf.APP_PORT}`);
}

bootstrap();
