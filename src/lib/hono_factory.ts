import { createFactory } from "hono/factory";
import { envConf } from "../config/env.conf";
import api_response from "../utils/api_response";

type Env = {
  Variables: {};
};

const honoFactory = createFactory<Env>({
  initApp: async (app) => {
    console.log("Initializing Hono app...");
    console.log(`Server started on port ${envConf.APP_PORT}`);
  },
});

export default honoFactory;
