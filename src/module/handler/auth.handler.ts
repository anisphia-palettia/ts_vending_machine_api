import honoFactory from "../../lib/hono_factory";
import zodValidator from "../../middleware/zod_validator";
import api_response from "../../utils/api_response";
import { loginSchema } from "../schema/auth.schema";
import authService from "../service/auth.service";

const authHandler = honoFactory.createApp();

authHandler.post("/login", zodValidator("json", loginSchema), async (c) => {
  const validated = c.req.valid("json");

  await authService.login(validated);

  return api_response.success(c, { message: "Login successful" });
});

export default authHandler;
