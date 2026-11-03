import { createRoute, z } from "@hono/zod-openapi";

import { getErrorResponses } from "@/lib/errorResponses";

import { jsonContent } from "@/schemas/helpers";
import { UserParamsSchema, UserSchema } from "@/schemas/user";

export const getUsers = createRoute({
  method: "get",
  path: "/users",
  request: {
    query: z.object({
      limit: z.coerce.number().int().min(1).max(100).optional(),
    }),
  },
  responses: {
    200: jsonContent(z.array(UserSchema), "List of users"),
    ...getErrorResponses,
  },
});

export const getUserById = createRoute({
  method: "get",
  path: "/users/{userId}",
  request: {
    params: UserParamsSchema,
  },
  responses: {
    200: {
      description: "User retrieved successfully",
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
    },
    ...getErrorResponses,
  },
});
