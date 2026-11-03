import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import "dotenv/config";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { healthRoutes } from "./routes/health";
import { userRoutes } from "./routes/user";

export const app = new OpenAPIHono();

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:8081",
      "http://localhost:19000",
      "http://localhost:19001",
      "http://localhost:19002",
      "http://localhost:19006",
      "http://frontend:8081",
      "http://frontend:19000",
      "http://frontend:19001",
      "http://frontend:19002",
    ],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ message: err.message }, err.status);
  }

  console.error(err);
  return c.json({ message: "Internal Server Error" }, 500);
});

app.route("/", healthRoutes);
app.route("/", userRoutes);

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    title: "Mobile Starter API",
    version: "1.0.0",
  },
});

app.get("/swagger", swaggerUI({ url: "/doc" }));
