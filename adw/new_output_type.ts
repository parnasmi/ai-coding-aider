import { execSync } from "child_process";
import { existsSync } from "fs";
import * as path from "path";

/**
 * Create a new output type based on a natural-language description.
 * @param description Description of the new output type to generate
 */
function newOutputType(description: string) {
  if (!description) {
    throw new Error("Description is required");
  }

  const projectRoot = process.cwd();
  const packageJsonPath = path.join(projectRoot, "package.json");

  if (!existsSync(packageJsonPath)) {
    throw new Error(
      "package.json not found in current directory – run this from the project root"
    );
  }

  /**
   * BIG THREE
   */

  // Files to be edited
  const contextEditable = [
    "spec_based_ai_coding/mainSpec.ts",
    "spec_based_ai_coding/outputFormatSpec.ts",
  ];

  // Files that are read-only references
  const contextReadOnly = [
    "spec_based_ai_coding/dataTypesSpec.ts",
    "package.json",
  ];

  // Prompt
  const prompt = `
    UPDATE outputFormatSpec.ts:
        ADD a new output format to the application based on the following description:
        "${description}"

    UPDATE mainSpec.ts:
        UPDATE the mainSpec.ts file to support the new output type
        and save with the correct file extension for the new output type.
  `;

  // Aider CLI command
  const command = [
    "aider",
    "--model gemini/gemini-3-flash-preview",
    "--no-auto-commits",
    "--no-suggest-shell-commands",
    ...contextEditable.map((f) => `"${f}"`),
    ...contextReadOnly.map((f) => `--read "${f}"`),
    "--message",
    `"${prompt.trim()}"`
  ].join(" ");

  console.log("Running AI Developer Workflow: new output type");
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
    console.error("Usage: npx tsx adw/newOutputType.ts \"<description>\"");
    process.exit(1);
  }

  newOutputType(description);
}
