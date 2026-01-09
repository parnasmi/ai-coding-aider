import { readFile } from "fs/promises";
import { wordCounter } from "./wordCounterSpec";
import { analyzeTranscript } from "./llmSpec";

/**
 * CLI entry point:
 * - Args: <path-to-transcript> [minCountThreshold=10]
 * - Reads file, counts filtered words, prints counts,
 * - Analyzes transcript with LLM, prints analysis.
 */
async function main() {
  const [, , pathToTranscriptFile, minCountArg] = process.argv;

  if (!pathToTranscriptFile) {
    console.error(
      "Usage: tsx spec_based_ai_coding/mainSpec.ts <path-to-transcript> [minCountThreshold]"
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
}

// Run the CLI
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
