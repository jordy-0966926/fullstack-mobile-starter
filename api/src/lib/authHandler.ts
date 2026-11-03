import { createMiddleware } from "hono/factory";

/**
 * Authentication is not implemented. Public sample routes do not mount this
 * middleware. Replace it before using protected data; as-is it denies access.
 */
export const authMiddleware = createMiddleware(async (c) => {
  return c.json({ message: "Authentication is not configured" }, 401);
});
