import { build } from "bun";

await build({
  entrypoints: ["./src/server.ts"],
  outdir: "./dist",
  target: "node",
  format: "esm",
  minify: true,
  sourcemap: "inline",
});

import { copyFileSync } from "fs";
copyFileSync("package.json", "./dist/package.json");
console.log("✅ Build selesai! dist/ siap production");
