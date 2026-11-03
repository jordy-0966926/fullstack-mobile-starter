import { HealthResponseSchema } from "@/schemas/health";
import { ErrorSchema } from "@/schemas/helpers";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { pool } from "db/drizzle";

export const healthRoutes = new OpenAPIHono();

const healthRoute = createRoute({
  method: "get",
  path: "/health",
  responses: {
    200: {
      description: "Service is healthy",
      content: {
        "application/json": {
          schema: HealthResponseSchema,
        },
      },
    },
    503: {
      description: "Database unavailable",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

healthRoutes.openapi(healthRoute, async (c) => {
  try {
    await pool.query("SELECT 1");
    return c.json({ status: "healthy" } as const, 200);
  } catch {
    return c.json({ message: "Database unavailable" }, 503);
  }
});
