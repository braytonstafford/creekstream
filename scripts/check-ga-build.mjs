import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const TEST_ID = "G-TEST123456";

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) walk(path, files);
    else files.push(path);
  }
  return files;
}

const build = spawnSync("npm", ["run", "build"], {
  env: {
    ...process.env,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: TEST_ID,
  },
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"],
});

if (build.status !== 0) {
  process.stderr.write(build.stdout ?? "");
  process.stderr.write(build.stderr ?? "");
  console.error("check-ga-build: npm run build failed");
  process.exit(build.status ?? 1);
}

const roots = [".next"];
let haystack = "";
for (const root of roots) {
  try {
    for (const file of walk(root)) {
      if (!/\.(js|html|json|rsc|map)$/.test(file)) continue;
      try {
        haystack += readFileSync(file, "utf8");
      } catch {}
    }
  } catch {}
}

const missing = [];
if (!haystack.includes(TEST_ID)) missing.push(TEST_ID);
const hasGtag =
  haystack.includes("gtag/js") || haystack.includes("gtag.js");
if (!hasGtag) missing.push("gtag/js");

if (missing.length) {
  console.error(
    `check-ga-build: build output missing: ${missing.join(", ")}`,
  );
  process.exit(1);
}

console.log(`check-ga-build: ok (found ${TEST_ID} and gtag/js)`);
