import { zodResponseFormat } from "openai/helpers/zod";
import OpenAI from "openai/index";
import { TranscriptAnalysis, TranscriptAnalysisSchema } from "./dataTypesSpec";

export async function analyzeTranscript(
  transcript: string,
  wordCounts: Record<string, number>
): Promise<TranscriptAnalysis> {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await client.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant analyzing transcripts.",
      },
      { role: "user", content: JSON.stringify({ transcript, wordCounts }) },
    ],
    response_format: zodResponseFormat(
      TranscriptAnalysisSchema,
      "transcript_analysis"
    ),
  });

  const message = completion.choices[0]?.message;
  if (message?.parsed) {
    return message.parsed;
  } else {
    throw new Error("Failed to parse transcript analysis");
  }
}
