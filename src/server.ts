import app from "./app";
import { envConf } from "./config/env.conf";

function bootstrap() {
  Bun.serve({
    port: envConf.PORT,
    fetch: app.fetch,
  });
}

bootstrap();
