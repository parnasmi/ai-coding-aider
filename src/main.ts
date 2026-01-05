import "dotenv/config";
import { readFileSync } from "node:fs";
import { analyzeTranscript } from "./llm";
import {
  getTranscriptFilePath,
  getMinCountThreshold,
  getOutputFormat,
} from "./arg_parse";
import { formatAsStr, formatAsJson, formatAsMarkdown, formatAsYaml } from "./outputFormat";
import { writeFileSync } from "node:fs";
import { word_blacklist } from "./constants";
import { wordCountBarChart } from "./chart";

function readTranscript(filePath: string): string {
  return readFileSync(filePath, "utf-8");
}

const args = process.argv.slice(2);
const transcriptFilePath = getTranscriptFilePath();
const outputFormat = getOutputFormat();
const transcriptContent = readTranscript(transcriptFilePath);

function countWordFrequencies(text: string): Record<string, number> {
  const wordCounts: Record<string, number> = {};
  const words = text.split(/\s+/);

  for (let word of words) {
    word = word.toLowerCase().replace(/[?.,!]/g, ""); // Normalize to lowercase and strip punctuation
    if (word_blacklist.includes(word)) {
      continue;
    }
    if (wordCounts[word]) {
      wordCounts[word] += 1;
    } else {
      wordCounts[word] = 1;
    }
  }

  return wordCounts;
}

const wordFrequencies = countWordFrequencies(transcriptContent);

function filterWordFrequencies(
  wordCounts: Record<string, number>,
  threshold: number
): Record<string, number> {
  return Object.fromEntries(
    Object.entries(wordCounts).filter(([_, count]) => count > threshold)
  );
}

const MIN_COUNT_THRESHOLD = getMinCountThreshold();
const filteredWordFrequencies = filterWordFrequencies(
  wordFrequencies,
  MIN_COUNT_THRESHOLD
);

analyzeTranscript(transcriptContent, wordFrequencies)
  .then((analysis) => {
    let formattedOutput;
    let fileExtension;

    switch (outputFormat) {
      case "json":
        formattedOutput = formatAsJson(analysis);
        fileExtension = "json";
        break;
      case "markdown":
        formattedOutput = formatAsMarkdown(analysis);
        fileExtension = "md";
        break;
      case "yaml":
        formattedOutput = formatAsYaml(analysis);
        fileExtension = "yaml";
        break;
      default:
        formattedOutput = formatAsStr(analysis);
        fileExtension = "txt";
        break;
    }

    const outputFilePath = `transcript_analysis.${fileExtension}`;
    writeFileSync(outputFilePath, formattedOutput);
    console.log(`Transcript analysis saved to ${outputFilePath}`);
  })
  .then(() => {
    wordCountBarChart(filteredWordFrequencies);
  })
  .catch((error) => {
    console.error("Error analyzing transcript:", error);
  });
