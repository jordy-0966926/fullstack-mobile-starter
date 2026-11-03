import { OpenAPIHono } from "@hono/zod-openapi";

/** Keep validation failures consistent with the documented JSON error schema. */
export const createRouter = () => new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ message: "Invalid request parameters" }, 400);
    }
  },
});
