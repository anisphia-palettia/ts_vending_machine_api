import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
}
const success = <T>(
  c: Context,
  {
    message,
    data,
    status = 200,
  }: {
    message: string;
    data?: T;
    status?: ContentfulStatusCode;
  },
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
  };

  return c.json(response, status);
};

const error = (
  c: Context,
  {
    message,
    error,
    status = 500,
  }: {
    message: string;
    error?: unknown;
    status?: ContentfulStatusCode;
  },
) => {
  const response: ApiResponse = {
    success: false,
    message,
    ...(error ? { error } : {}),
  };

  return c.json(response, status);
};

export default { success, error };
