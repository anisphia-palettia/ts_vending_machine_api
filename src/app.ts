import { handleAppError } from "./lib/handle_app_error";
import honoFactory from "./lib/hono_factory";

const app = honoFactory.createApp();

app.onError(handleAppError);

export default app;
