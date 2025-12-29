import { readFileSync } from "node:fs";

function readTranscript(filePath: string): string {
  return readFileSync(filePath, "utf-8");
}

const transcriptContent = readTranscript("./transcript.txt");

function countWordFrequencies(text: string): Record<string, number> {
  const wordCounts: Record<string, number> = {};
  const words = text.split(/\s+/);

  for (let word of words) {
    word = word.toLowerCase(); // Normalize to lowercase
    if (wordCounts[word]) {
      wordCounts[word] += 1;
    } else {
      wordCounts[word] = 1;
    }
  }

  return wordCounts;
}

const wordFrequencies = countWordFrequencies(transcriptContent);

const MIN_COUNT_THRESHOLD = 1;

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
