import { spawnSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import * as path from "path";

/**
 * Create a new chart type based on a markdown spec + description.
 */
function newChartType(description: string) {
  if (!description) {
    throw new Error("Description is required");
  }

  const projectRoot = process.cwd();
  const packageJsonPath = path.join(projectRoot, "package.json");
  const specPath = path.join(projectRoot, "spec", "new-chart-type.md");

  if (!existsSync(packageJsonPath)) {
    throw new Error("package.json not found – run from project root");
  }

  if (!existsSync(specPath)) {
    throw new Error("spec/new-chart-type.md not found");
  }

  // Read and inject description
  const specContent = readFileSync(specPath, "utf-8");
  const specPrompt = specContent.replace("<description>", description);

  const args = [
    "--model", "gemini/gemini-3-flash-preview",
    "--edit-format", "architect",
    "--yes",
    "--no-auto-commits",
    "--no-suggest-shell-commands",

    // editable
    "spec_based_ai_coding/mainSpec.ts",
    "spec_based_ai_coding/chartSpec.ts",

    // read-only
    "--read", "spec_based_ai_coding/dataTypesSpec.ts",
    "--read", "package.json",

    // read prompt from stdin
    "--message", "-"
  ];

  console.log("Running AI Developer Workflow: new chart type");

  const result = spawnSync("aider", args, {
    stdio: ["pipe", "inherit", "inherit"],
    env: process.env,
    input: specPrompt
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

// CLI entry
if (require.main === module) {
  const description = process.argv[2];

  if (!description) {
    console.error('Usage: npx tsx adw/newChartType.ts "<description>"');
    process.exit(1);
  }

  newChartType(description);
}
