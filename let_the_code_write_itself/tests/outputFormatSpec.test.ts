import { formatAsHtmlGreenGradientTheme, formatAsHtmlWithSliderFilter } from "../outputFormatSpec";
import { TranscriptAnalysis, WordCounts } from "../dataTypesSpec";

describe("formatAsHtmlGreenGradientTheme", () => {
  it("should format the transcript analysis and word counts as HTML with a green gradient theme", () => {
    const analysis: TranscriptAnalysis = {
      quick_summary: "This is a quick summary.",
      bullet_point_highlights: ["Highlight 1", "Highlight 2"],
      sentiment_analysis: "Positive",
      keywords: ["keyword1", "keyword2"],
    };

    const wordCounts: WordCounts = {
      countToWordMap: {
        word1: 5,
        word2: 3,
      },
    };

    const result = formatAsHtmlGreenGradientTheme(analysis, wordCounts);
    expect(result).toContain("<!DOCTYPE html>");
    expect(result).toContain("background: linear-gradient(to bottom, #e0f7fa, #00695c);");
    expect(result).toContain("<h1>Transcript Analysis</h1>");
    expect(result).toContain("<h2>Quick Summary</h2>");
    expect(result).toContain("<p>This is a quick summary.</p>");
    expect(result).toContain("<h2>Bullet Point Highlights</h2>");
    expect(result).toContain("<li>Highlight 1</li>");
    expect(result).toContain("<li>Highlight 2</li>");
    expect(result).toContain("<h2>Sentiment Analysis</h2>");
    expect(result).toContain("<p>Positive</p>");
    expect(result).toContain("<h2>Keywords</h2>");
    expect(result).toContain("<p>keyword1, keyword2</p>");
    expect(result).toContain("<h2>Word Counts</h2>");
    expect(result).toContain("<li>word1: 5</li>");
    expect(result).toContain("<li>word2: 3</li>");
  });
});

describe("formatAsHtmlWithSliderFilter", () => {
  it("should format the transcript analysis and word counts as HTML with a slider filter", () => {
    const analysis: TranscriptAnalysis = {
      quick_summary: "This is a quick summary.",
      bullet_point_highlights: ["Highlight 1", "Highlight 2"],
      sentiment_analysis: "Positive",
      keywords: ["keyword1", "keyword2"],
    };

    const wordCounts: WordCounts = {
      countToWordMap: {
        word1: 5,
        word2: 3,
      },
    };

    const result = formatAsHtmlWithSliderFilter(analysis, wordCounts);
    expect(result).toContain("<!DOCTYPE html>");
    expect(result).toContain("<input type='range' id='wordThreshold'");
    expect(result).toContain("<li class='word-count' data-count='5'>word1: 5</li>");
    expect(result).toContain("<li class='word-count' data-count='3'>word2: 3</li>");
  });
});
