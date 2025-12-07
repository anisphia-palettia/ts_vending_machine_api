import { cors } from "hono/cors";
import { handleAppError } from "./lib/handle_app_error";
import honoFactory from "./lib/hono_factory";
import authHandler from "./module/handler/auth.handler";
import productHandler from "./module/handler/product.handler";
import { serveStatic } from "hono/bun";

const app = honoFactory.createApp();

app.use(cors());

app.use("/*", serveStatic({ root: "./public" }));

app.route("/auth", authHandler);
app.route("/product", productHandler);

app.onError(handleAppError);

export default app;
