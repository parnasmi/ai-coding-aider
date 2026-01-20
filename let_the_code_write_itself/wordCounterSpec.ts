import { COMMON_WORDS_BLACKLIST } from "./constantsSpec";
import type { WordCounts } from "./dataTypesSpec";

/**
 * Count word frequencies from a transcript, filter common words, and
 * keep only words with count > minCountThreshold, sorted descending by count.
 */
export function wordCounter(
  script: string,
  minCountThreshold: number = 10
): WordCounts {
  // Normalize: remove punctuation (except apostrophes), lowercase
  const cleaned = script.replace(/[^\w\s']/g, " ").toLowerCase();

  // Split by whitespace
  const tokens = cleaned.split(/\s+/).filter(Boolean);

  // Prepare blacklist for O(1) lookups
  const blacklist = new Set(COMMON_WORDS_BLACKLIST);

  // Count occurrences
  const counts: Record<string, number> = {};
  for (const token of tokens) {
    if (blacklist.has(token)) continue;
    counts[token] = (counts[token] || 0) + 1;
  }

  // Filter by threshold (>), sort descending
  const filteredSorted = Object.entries(counts)
    .filter(([, c]) => c > minCountThreshold)
    .sort((a, b) => b[1] - a[1]);

  // Preserve order in returned map
  const ordered: Record<string, number> = {};
  for (const [word, count] of filteredSorted) {
    ordered[word] = count;
  }

  return { countToWordMap: ordered };
}
