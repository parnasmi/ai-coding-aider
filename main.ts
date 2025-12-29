import "dotenv/config";
import { readFileSync } from "node:fs";
import { analyzeTranscript } from "./llm";
import { getTranscriptFilePath, getMinCountThreshold } from "./arg_parse";
import { word_blacklist } from "./constants";

function readTranscript(filePath: string): string {
  return readFileSync(filePath, "utf-8");
}

const transcriptFilePath = getTranscriptFilePath();
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

const MIN_COUNT_THRESHOLD = getMinCountThreshold();

function printWordFrequencies(wordCounts: Record<string, number>): void {
  Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([word, count]) => {
      if (count > MIN_COUNT_THRESHOLD) {
        console.log(`'${word}': ${count} ${"#".repeat(count)}`);
      }
    });
}

printWordFrequencies(wordFrequencies);

analyzeTranscript(transcriptContent, wordFrequencies)
  .then((analysis) => {
    console.log("\nTranscript Analysis:");
    console.log("Quick Summary:", analysis.quick_summary);
    console.log("Bullet Point Highlights:", analysis.bullet_point_highlights);
    console.log("Sentiment Analysis:", analysis.sentiment_analysis);
    console.log("Keywords:", analysis.keywords.join(", "));
  })
  .catch((error) => {
    console.error("Error analyzing transcript:", error);
  });
