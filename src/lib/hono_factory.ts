import { createFactory } from "hono/factory";
import { envConf } from "../config/env.conf";
import api_response from "../utils/api_response";

type Env = {
  Variables: {};
};

const honoFactory = createFactory<Env>({});

export default honoFactory;
