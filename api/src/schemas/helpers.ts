import { z } from "@hono/zod-openapi";

export const jsonContent = <T extends z.ZodType>(schema: T, description: string) => ({
  description,
  content: {
    "application/json": {
      schema,
    },
  },
});

export const ErrorSchema = z.object({
  message: z.string(),
  code: z.number().optional(),
});
