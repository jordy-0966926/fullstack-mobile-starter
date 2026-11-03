import assert from "node:assert/strict";
import { after, mock, test } from "node:test";
import { Hono } from "hono";
import { app } from "../src/app";
import { authMiddleware } from "../src/lib/authHandler";
import { pool } from "db/drizzle";

after(async () => { await pool.end(); });

test("invalid IDs and limits return documented JSON errors before querying", async () => {
  for (const path of ["/users/nope", "/users/0", "/users/-1", "/users/1.5", "/users/2147483648", "/users/9007199254740992", "/users?limit=-1", "/users?limit=0", "/users?limit=1.5", "/users?limit=101"]) {
    const response = await app.request(path);
    assert.equal(response.status, 400, path);
    assert.match(response.headers.get("content-type") ?? "", /application\/json/);
    assert.equal(typeof (await response.json() as { message: string }).message, "string");
  }
});

test("sample auth middleware denies access until authentication is implemented", async () => {
  const router = new Hono();
  router.use("/*", authMiddleware);
  router.get("/private", (c) => c.json({ private: true }));
  assert.equal((await router.request("/private")).status, 401);
});

test("OpenAPI includes validation errors and the user response schema", async () => {
  const response = await app.request("/doc");
  const schema = await response.json() as { paths: Record<string, { get: { responses: Record<string, unknown> } }> };
  assert.ok(schema.paths["/users/{userId}"]?.get.responses["400"]);
  assert.ok(schema.paths["/users"]?.get.responses["200"]);
});

test("database failures return the documented JSON health response", async () => {
  const query = mock.method(pool, "query", () => { throw new Error("private connection details"); });
  try {
    const response = await app.request("/health");
    assert.equal(response.status, 503);
    assert.match(response.headers.get("content-type") ?? "", /application\/json/);
    assert.deepEqual(await response.json(), { message: "Database unavailable" });
  } finally {
    query.mock.restore();
  }
});

// Opt into checks against a disposable seeded database; never write to it here.
test("seeded database supports health, lists, limits, details and missing users", { skip: !process.env["TEST_DATABASE"] }, async () => {
  assert.equal((await app.request("/health")).status, 200);
  const list = await app.request("/users");
  assert.equal(list.status, 200);
  const users = await list.json() as Array<{ id: number; password?: string }>;
  assert.ok(users.length > 0);
  assert.ok(users.every((user) => !("password" in user)));
  const limited = await app.request("/users?limit=1");
  assert.equal((await limited.json() as unknown[]).length, 1);
  assert.equal((await app.request("/users/" + users[0]!.id)).status, 200);
  assert.equal((await app.request("/users/2147483647")).status, 404);
});
