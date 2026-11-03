import { build } from "esbuild";
import { readFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile(new URL("./package.json", import.meta.url)));

// Compile the shared local db package too; keep ordinary npm dependencies external.
await build({
  entryPoints: ["src/server.ts"],
  outfile: "dist/server.js",
  platform: "node",
  target: "node22",
  format: "esm",
  bundle: true,
  external: Object.keys(manifest.dependencies).filter((name) => name !== "db"),
});
