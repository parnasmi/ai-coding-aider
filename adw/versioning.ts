import { execSync } from "child_process";
import { existsSync } from "fs";
import * as path from "path";

/**
 * Bump the project version using Aider (programmatic AI workflow).
 * @param bumpType - 'patch' | 'minor' | 'major'
 */
function bumpVersion(bumpType: string = "patch") {
  if (!["patch", "minor", "major"].includes(bumpType)) {
    throw new Error("bumpType must be 'patch', 'minor', or 'major'");
  }

  const projectRoot = process.cwd();
  const packageJsonPath = path.join(projectRoot, "package.json");

  if (!existsSync(packageJsonPath)) {
    throw new Error(
      "package.json not found in current directory – run this from project root"
    );
  }

  /**
   * Big Three
   */

  // Editable context
  const editableFiles = ["package.json"];

  // Read-only context
  const readOnlyFiles = ["README.md"];

  // Prompt
  const prompt = `${bumpType} bump package.json version number.`;

  /**
   * Aider CLI execution
   * This is the Node.js equivalent of using Coder.create(...)
   */
  const command = [
    "aider",
    "--model gpt-4o",
    "--no-auto-commits",
    "--no-suggest-shell-commands",
    ...editableFiles.map((f) => `"${f}"`),
    ...readOnlyFiles.map((f) => `--read "${f}"`),
    "--message",
    `"${prompt}"`
  ].join(" ");

  console.log("Running AI Developer Workflow:");
  console.log(command);

  execSync(command, {
    stdio: "inherit",
    env: process.env
  });
}

// CLI entry
const bumpType = process.argv[2] ?? "patch";
bumpVersion(bumpType);
