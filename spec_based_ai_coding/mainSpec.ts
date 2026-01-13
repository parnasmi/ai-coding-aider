import { readFile, writeFile } from "fs/promises";
import { extname } from "path";
import { wordCounter } from "./wordCounterSpec";
import { analyzeTranscript } from "./llmSpec";
import { createBarChart, createPieChart, createLineChart } from "./chartSpec";
import { formatAsTxt, formatAsJson, formatAsMd, formatAsYaml } from "./outputFormatSpec";

/**
 * CLI entry point:
 * - Args: <path-to-transcript> [minCountThreshold=10]
 * - Reads file, counts filtered words, prints counts,
 * - Analyzes transcript with LLM, prints analysis.
 */
async function main() {
  const [, , pathToTranscriptFile, minCountArg] = process.argv;

  const args = process.argv.slice(2);
  const chartIdx = args.indexOf("--chart");
  const chartType = chartIdx !== -1 ? args[chartIdx + 1] : undefined;

  const outIdx = args.indexOf("--output-file");
  const outputFilePath = outIdx !== -1 ? args[outIdx + 1] : undefined;

  if (!pathToTranscriptFile) {
    console.error(
      "Usage: tsx spec_based_ai_coding/mainSpec.ts <path-to-transcript> [minCountThreshold] [--chart <bar|pie|line>] [--output-file <path.(txt|json|md|yaml)>]"
    );
    process.exit(1);
  }

  const minCountThreshold = minCountArg ? parseInt(minCountArg, 10) : 10;

  // Read the transcript file
  const transcript = await readFile(pathToTranscriptFile, "utf-8");

  // Count and filter word frequencies
  const { countToWordMap } = wordCounter(transcript, minCountThreshold);
  
  // Print word frequencies as "<word>: ###" where # is repeated count times
  for (const [word, count] of Object.entries(countToWordMap)) {
    console.log(`${word}: ${"#".repeat(count as any)}`);
  }

  if (chartType) {
    const ct = String(chartType).toLowerCase();
    if (ct === "bar") {
      createBarChart({ countToWordMap });
    } else if (ct === "pie") {
      createPieChart({ countToWordMap });
    } else if (ct === "line") {
      createLineChart({ countToWordMap });
    } else {
      console.error('Unsupported chart type. Use one of: "bar", "pie", "line".');
      process.exit(1);
    }
  }

  // Analyze transcript and print the structured result
  const analysis = await analyzeTranscript(transcript, countToWordMap);
  console.log("Transcript Analysis:", analysis);

  if (outputFilePath) {
    const ext = extname(outputFilePath).toLowerCase();
    let content: string | undefined;

    if (ext === ".txt") {
      content = formatAsTxt(analysis, { countToWordMap });
    } else if (ext === ".json") {
      content = formatAsJson(analysis, { countToWordMap });
    } else if (ext === ".md") {
      content = formatAsMd(analysis, { countToWordMap });
    } else if (ext === ".yaml") {
      content = formatAsYaml(analysis, { countToWordMap });
    } else {
      console.error('Unsupported output file extension. Use one of: ".txt", ".json", ".md", ".yaml".');
      process.exit(1);
    }

    await writeFile(outputFilePath, content!, "utf-8");
  }
}

// Run the CLI
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
