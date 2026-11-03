import { z } from "@hono/zod-openapi";

export const HealthResponseSchema = z.object({
  status: z.literal("healthy"),
});
