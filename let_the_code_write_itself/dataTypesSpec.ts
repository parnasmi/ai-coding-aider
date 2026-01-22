import { z } from "zod";

export type WordCounts = {
  countToWordMap: Record<string, number>;
};

export type TranscriptAnalysis = {
  quick_summary: string;
  bullet_point_highlights: string[];
  sentiment_analysis: string;
  keywords: string[];
};

export const TranscriptAnalysisSchema = z.object({
  quick_summary: z.string(),
  bullet_point_highlights: z.array(z.string()),
  sentiment_analysis: z.string(),
  keywords: z.array(z.string()),
});
