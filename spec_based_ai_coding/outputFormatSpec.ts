import yaml from "js-yaml";
import { TranscriptAnalysis, WordCounts } from "./dataTypesSpec";

export function formatAsTxt(
  transcriptAnalysis: TranscriptAnalysis,
  wordCounts: WordCounts
): string {
  const lines: string[] = [];
  lines.push("Quick Summary:");
  lines.push(transcriptAnalysis.quick_summary);
  lines.push("");
  lines.push("Bullet Point Highlights:");
  for (const bp of transcriptAnalysis.bullet_point_highlights) {
    lines.push(`- ${bp}`);
  }
  lines.push("");
  lines.push("Sentiment Analysis:");
  lines.push(transcriptAnalysis.sentiment_analysis);
  lines.push("");
  lines.push("Keywords:");
  lines.push(transcriptAnalysis.keywords.join(", "));
  lines.push("");
  lines.push("Word Counts:");
  for (const [word, count] of Object.entries(wordCounts.countToWordMap)) {
    lines.push(`${word}: ${count}`);
  }
  return lines.join("\n");
}

export function formatAsJson(
  transcriptAnalysis: TranscriptAnalysis,
  wordCounts: WordCounts
): string {
  return JSON.stringify(
    {
      quick_summary: transcriptAnalysis.quick_summary,
      bullet_point_highlights: transcriptAnalysis.bullet_point_highlights,
      sentiment_analysis: transcriptAnalysis.sentiment_analysis,
      keywords: transcriptAnalysis.keywords,
      word_counts: wordCounts.countToWordMap,
    },
    null,
    2
  );
}

export function formatAsMd(
  transcriptAnalysis: TranscriptAnalysis,
  wordCounts: WordCounts
): string {
  const lines: string[] = [];
  lines.push(`# Transcript Analysis`);
  lines.push("");
  lines.push(`## Quick Summary`);
  lines.push(transcriptAnalysis.quick_summary);
  lines.push("");
  lines.push(`## Bullet Point Highlights`);
  for (const bp of transcriptAnalysis.bullet_point_highlights) {
    lines.push(`- ${bp}`);
  }
  lines.push("");
  lines.push(`## Sentiment Analysis`);
  lines.push(transcriptAnalysis.sentiment_analysis);
  lines.push("");
  lines.push(`## Keywords`);
  lines.push(transcriptAnalysis.keywords.map((k) => `\`${k}\``).join(", "));
  lines.push("");
  lines.push(`## Word Counts`);
  for (const [word, count] of Object.entries(wordCounts.countToWordMap)) {
    lines.push(`- ${word}: ${count}`);
  }
  return lines.join("\n");
}

export function formatAsYaml(
  transcriptAnalysis: TranscriptAnalysis,
  wordCounts: WordCounts
): string {
  const data = {
    quick_summary: transcriptAnalysis.quick_summary,
    bullet_point_highlights: transcriptAnalysis.bullet_point_highlights,
    sentiment_analysis: transcriptAnalysis.sentiment_analysis,
    keywords: transcriptAnalysis.keywords,
    word_counts: wordCounts.countToWordMap,
  };
  return yaml.dump(data);
}
