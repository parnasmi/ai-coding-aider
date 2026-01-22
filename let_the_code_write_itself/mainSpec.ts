import { readFile, writeFile } from "fs/promises";
import { extname } from "path";
import { wordCounter } from "./wordCounterSpec";
import { analyzeTranscript } from "./llmSpec";
import {
  createBarChart,
  createPieChart,
  createLineChart,
  createTopPieChart,
  createRadialBarChart,
  createBubbleChart,
} from "./chartSpec";
import {
  formatAsTxt,
  formatAsJson,
  formatAsMd,
  formatAsYaml,
  formatAsHtml,
  formatAsHtmlGreenGradientTheme,
  formatAsHtmlWithSliderFilter,
} from "./outputFormatSpec";

const CHART_TYPES = new Set(["bar", "pie", "line", "top-pie", "radial", "bubble"]);
const OUTPUT_EXTS = new Set([
  ".txt",
  ".json",
  ".md",
  ".yaml",
  ".yml",
  ".html",
  ".htmlsld",
  ".htmlg",
]);

function getFlagValue(args: string[], name: string): string | undefined {
  const long = `--${name}`;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === long) return args[i + 1]; // --name value
    if (arg.startsWith(long + "=")) return arg.slice(long.length + 1); // --name=value
  }
  return undefined;
}

/**
 * CLI entry point:
 * - Args: <path-to-transcript> [minCountThreshold=10]
 * - Reads file, counts filtered words, prints counts,
 * - Analyzes transcript with LLM, prints analysis.
 */
async function main() {
  const [, , pathToTranscriptFile, minCountArg] = process.argv;

  const args = process.argv.slice(2);

  const chartTypeFromFlag = getFlagValue(args, "chart");
  let outputFilePath = getFlagValue(args, "output-file");

  // Positional fallback support: <path> <threshold> [chart] [output]
  const nonFlagArgs = args.filter((a) => !a.startsWith("--"));
  let chartType = chartTypeFromFlag?.toLowerCase();

  if (
    !chartType &&
    nonFlagArgs[2] &&
    CHART_TYPES.has(nonFlagArgs[2].toLowerCase())
  ) {
    chartType = nonFlagArgs[2].toLowerCase();
  }

  if (!outputFilePath && nonFlagArgs[3]) {
    const val = nonFlagArgs[3];
    const low = val.toLowerCase().replace(/^\./, "");
    if (["txt", "json", "md", "yaml", "yml", "html", "htmlg"].includes(low)) {
      // bare extension -> default filename
      outputFilePath = `transcript_analysis.${low === "yml" ? "yaml" : low}`;
    }
  }

  if (!pathToTranscriptFile) {
    console.error(
      "Usage: tsx spec_based_ai_coding/mainSpec.ts <path-to-transcript> [minCountThreshold] [--chart <bar|pie|line|bubble|top-pie|radial>|--chart=pie] [--output-file <path>|--output-file=json]\nAlso supports positional: <path> <threshold> [bar|pie|line|bubble|top-pie|radial] [txt|json|md|yaml|html|htmlg]",
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

  // Analyze transcript and print the structured result
  const analysis = await analyzeTranscript(transcript, countToWordMap);
  console.log("Transcript Analysis:", analysis);

  if (chartType) {
    const ct = String(chartType).toLowerCase();
    if (ct === "bar") {
      createBarChart({ countToWordMap });
    } else if (ct === "pie") {
      createPieChart({ countToWordMap });
    } else if (ct === "line") {
      createLineChart({ countToWordMap });
    } else if (ct === "top-pie") {
      createTopPieChart({ countToWordMap });
    } else if (ct === "radial") {
      createRadialBarChart({ countToWordMap });
    } else if (ct === "bubble") {
      createBubbleChart({ countToWordMap });
    }
  }

  if (outputFilePath) {
    let ext = extname(outputFilePath).toLowerCase();

    // Handle bare extension values like "yaml" (no dot/path)
    if (!ext) {
      const low = outputFilePath.toLowerCase().replace(/^\./, "");
      if (["txt", "json", "md", "yaml", "yml", "html", "htmlg", "htmlsld"].includes(low)) {
        ext = low === "yml" ? ".yaml" : `.${low}`;
        if (!/[\/\\]/.test(outputFilePath)) {
          outputFilePath = `transcript_analysis${ext}`;
        }
      }
    }

    let content: string | undefined;
    if (ext === ".txt") {
      content = formatAsTxt(analysis, { countToWordMap });
    } else if (ext === ".json") {
      content = formatAsJson(analysis, { countToWordMap });
    } else if (ext === ".md") {
      content = formatAsMd(analysis, { countToWordMap });
    } else if (ext === ".yaml" || ext === ".yml") {
      content = formatAsYaml(analysis, { countToWordMap });
    } else if (ext === ".html") {
      content = formatAsHtml(analysis, { countToWordMap });
    } else if (ext === ".htmlg") {
      content = formatAsHtmlGreenGradientTheme(analysis, { countToWordMap });
      outputFilePath = outputFilePath.replace(/\.htmlg$/, ".html");
    } else if (ext === ".htmlsld") {
      content = formatAsHtmlWithSliderFilter(analysis, { countToWordMap });
      outputFilePath = outputFilePath.replace(/\.htmlsld$/, ".html");
    } else {
      console.error(
        'Unsupported output file extension. Use one of: ".txt", ".json", ".md", ".yaml", ".html", ".htmlg", ".htmlsld".',
      );
      process.exit(1);
    }

    await writeFile(outputFilePath, content!, "utf-8");
    console.log(`Wrote output to ${outputFilePath}`);
  }
}

// Run the CLI
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
