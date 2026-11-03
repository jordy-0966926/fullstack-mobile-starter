import type { RouteHandler } from "@hono/zod-openapi";
import { db, eq, User } from "db/drizzle";
import * as routes from "./routes";

const selectFields = {
  id: User.id,
  admin: User.admin,
  name: User.name,
  surname: User.surname,
  email: User.email,
  dateCreated: User.dateCreated,
  lastUpdated: User.lastUpdated,
  uuid: User.uuid,
};

export const getUsers: RouteHandler<typeof routes.getUsers> = async (c) => {
  const { limit = 10 } = c.req.valid("query");
  try {
    const users = await db.select(selectFields).from(User).limit(limit);
    return c.json(users, 200);
  } catch {
    return c.json({ message: "Failed to retrieve users" }, 500);
  }
};

export const getUserById: RouteHandler<typeof routes.getUserById> = async (c) => {
  const { userId } = c.req.valid("param");
  try {
    const [userRecord] = await db
      .select(selectFields)
      .from(User)
      .where(eq(User.id, userId))
      .limit(1);
    if (!userRecord) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json(userRecord, 200);
  } catch {
    return c.json({ message: "Failed to retrieve user" }, 500);
  }
};
