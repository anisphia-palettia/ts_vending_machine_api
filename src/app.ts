import { cors } from "hono/cors";
import { handleAppError } from "./lib/handle_app_error";
import honoFactory from "./lib/hono_factory";
import authHandler from "./module/handler/auth.handler";

const app = honoFactory.createApp();

app.use(cors());

app.route("/auth", authHandler);

app.onError(handleAppError);

export default app;
