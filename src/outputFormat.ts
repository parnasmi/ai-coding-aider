import { TranscriptAnalysis } from "./dataTypes";

export function formatAsStr(analysis: TranscriptAnalysis): string {
  return `
    Quick Summary: ${analysis.quick_summary}
    Bullet Point Highlights: ${analysis.bullet_point_highlights.join("\n- ")}
    Sentiment Analysis: ${analysis.sentiment_analysis}
    Keywords: ${analysis.keywords.join(", ")}
  `;
}

export function formatAsJson(analysis: TranscriptAnalysis): string {
  return JSON.stringify(analysis, null, 2);
}

export function formatAsMarkdown(analysis: TranscriptAnalysis): string {
  return `
    ## Quick Summary
    ${analysis.quick_summary}

    ## Bullet Point Highlights
    - ${analysis.bullet_point_highlights.join("\n- ")}

    ## Sentiment Analysis
    ${analysis.sentiment_analysis}

    ## Keywords
    ${analysis.keywords.join(", ")}
  `;
}
