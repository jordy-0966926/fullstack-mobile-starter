import { z } from "@hono/zod-openapi";

export const UserParamsSchema = z.object({
  userId: z.string().regex(/^[1-9]\d*$/, "Use a positive integer ID")
    .transform(Number).pipe(z.number().int().positive().max(2_147_483_647)),
});

export const UserSchema = z.object({
  id: z.number(),
  admin: z.boolean(),
  name: z.string(),
  surname: z.string(),
  email: z.email(),
  dateCreated: z.string().nullable(),
  lastUpdated: z.string().nullable(),
  uuid: z.uuid(),
});

export const UserListResponseSchema = z.object({
  users: z.array(UserSchema),
});

export const UserResponseSchema = z.object({
  user: UserSchema,
});
