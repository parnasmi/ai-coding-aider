import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import * as path from "path";

/**
 * Create a new chart type based on a markdown spec + description.
 * @param description Description of the new chart type
 */
function newChartType(description: string) {
  if (!description) {
    throw new Error("Description is required");
  }

  const projectRoot = process.cwd();
  const packageJsonPath = path.join(projectRoot, "package.json");
  const specPath = path.join(projectRoot, "spec", "new-chart-type.md");

  if (!existsSync(packageJsonPath)) {
    throw new Error(
      "package.json not found in current directory – run from project root"
    );
  }

  if (!existsSync(specPath)) {
    throw new Error(
      "spec/new-chart-type.md not found – please ensure it exists"
    );
  }

  // Read and inject description into spec
  const specContent = readFileSync(specPath, "utf-8");
  const specPrompt = specContent.replace("<description>", description);

  /**
   * BIG THREE
   */

  // Editable files
  const contextEditable = [
    "spec_based_ai_coding/mainSpec.ts",
    "spec_based_ai_coding/chartSpec.ts",
  ];

  // Read-only context
  const contextReadOnly = [
    "spec_based_ai_coding/dataTypesSpec.ts",
    "package.json",
  ];

  /**
   * Aider command (architect + diff style)
   */
  const command = [
    "aider",
    "--model openai/gpt-5",
    "--edit-format architect",
    "--yes",
    "--no-auto-commits",
    "--no-suggest-shell-commands",
    ...contextEditable.map((f) => `"${f}"`),
    ...contextReadOnly.map((f) => `--read "${f}"`),
    "--message",
    `"${specPrompt.trim()}"`,
  ].join(" ");

  console.log("Running AI Developer Workflow: new chart type");
  console.log(command);

  execSync(command, {
    stdio: "inherit",
    env: process.env,
  });
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
