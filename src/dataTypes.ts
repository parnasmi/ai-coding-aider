import { z } from "zod";

export const TranscriptAnalysisSchema = z.object({
  quick_summary: z.string(),
  bullet_point_highlights: z.array(z.string()),
  sentiment_analysis: z.string(),
  keywords: z.array(z.string()),
});

export type TranscriptAnalysis = z.infer<typeof TranscriptAnalysisSchema>;
