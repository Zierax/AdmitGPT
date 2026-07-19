// Prepares the minimal Vercel project metadata that `@cloudflare/next-on-pages`
// (and its internal `vercel build` step) expects, without requiring a linked
// Vercel account. This lets the Cloudflare Pages build run fully offline/local.
import { mkdir, writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const VERCEL_DIR = ".vercel";

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

const projectJson = {
  projectId: "prj_admitgpt",
  orgId: "team_admitgpt",
  settings: { framework: "nextjs" },
};

async function main() {
  await mkdir(VERCEL_DIR, { recursive: true });
  const projectPath = join(VERCEL_DIR, "project.json");
  if (!(await exists(projectPath))) {
    await writeFile(projectPath, JSON.stringify(projectJson, null, 2));
  }
  console.log("⚡️ Prepped .vercel/project.json for local Cloudflare build");
}

main().catch((err) => {
  console.error("prep-vercel failed:", err);
  process.exit(1);
});
