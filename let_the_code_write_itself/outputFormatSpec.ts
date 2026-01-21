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

export function formatAsHtmlGreenGradientTheme(
  transcriptAnalysis: TranscriptAnalysis,
  wordCounts: WordCounts
): string {
  const lines: string[] = [];
  lines.push("<!DOCTYPE html>");
  lines.push("<html>");
  lines.push("<head>");
  lines.push("<title>Transcript Analysis</title>");
  lines.push("<style>");
  lines.push("body { background: linear-gradient(to bottom, #e0f7fa, #00695c); color: #004d40; font-family: Arial, sans-serif; }");
  lines.push("h1, h2 { color: #004d40; }");
  lines.push("</style>");
  lines.push("</head>");
  lines.push("<body>");
  lines.push("<h1>Transcript Analysis</h1>");
  lines.push("<h2>Quick Summary</h2>");
  lines.push(`<p>${transcriptAnalysis.quick_summary}</p>`);
  lines.push("<h2>Bullet Point Highlights</h2>");
  lines.push("<ul>");
  for (const bp of transcriptAnalysis.bullet_point_highlights) {
    lines.push(`<li>${bp}</li>`);
  }
  lines.push("</ul>");
  lines.push("<h2>Sentiment Analysis</h2>");
  lines.push(`<p>${transcriptAnalysis.sentiment_analysis}</p>`);
  lines.push("<h2>Keywords</h2>");
  lines.push(`<p>${transcriptAnalysis.keywords.join(", ")}</p>`);
  lines.push("<h2>Word Counts</h2>");
  lines.push("<ul>");
  for (const [word, count] of Object.entries(wordCounts.countToWordMap)) {
    lines.push(`<li>${word}: ${count}</li>`);
  }
  lines.push("</ul>");
  lines.push("</body>");
  lines.push("</html>");
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

export function formatAsHtml(
  transcriptAnalysis: TranscriptAnalysis,
  wordCounts: WordCounts
): string {
  const lines: string[] = [];
  lines.push("<!DOCTYPE html>");
  lines.push("<html>");
  lines.push("<head><title>Transcript Analysis</title></head>");
  lines.push("<body>");
  lines.push("<h1>Transcript Analysis</h1>");
  lines.push("<h2>Quick Summary</h2>");
  lines.push(`<p>${transcriptAnalysis.quick_summary}</p>`);
  lines.push("<h2>Bullet Point Highlights</h2>");
  lines.push("<ul>");
  for (const bp of transcriptAnalysis.bullet_point_highlights) {
    lines.push(`<li>${bp}</li>`);
  }
  lines.push("</ul>");
  lines.push("<h2>Sentiment Analysis</h2>");
  lines.push(`<p>${transcriptAnalysis.sentiment_analysis}</p>`);
  lines.push("<h2>Keywords</h2>");
  lines.push(`<p>${transcriptAnalysis.keywords.join(", ")}</p>`);
  lines.push("<h2>Word Counts</h2>");
  lines.push("<ul>");
  for (const [word, count] of Object.entries(wordCounts.countToWordMap)) {
    lines.push(`<li>${word}: ${count}</li>`);
  }
  lines.push("</ul>");
  lines.push("</body>");
  lines.push("</html>");
  return lines.join("\n");
}
