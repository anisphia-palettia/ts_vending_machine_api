import type { ErrorHandler } from "hono";
import z, { ZodError } from "zod";
import api_response from "../utils/api_response";

export const handleAppError: ErrorHandler = (error, c) => {
  if (error instanceof ZodError) {
    return api_response.error(c, {
      message: "Validation Error",
      status: 400,
      error: z.flattenError(error),
    });
  }

  return api_response.error(c, {
    message: "Internal Server Error",
    status: 500,
  });
};
