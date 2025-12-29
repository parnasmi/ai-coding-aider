import { zodResponseFormat } from 'openai/helpers/zod';
import OpenAI from 'openai/index';
import { TranscriptAnalysis, TranscriptAnalysisSchema } from './dataTypes';

export async function analyzeTranscript(transcript: string): Promise<TranscriptAnalysis> {
  const client = new OpenAI();

  const completion = await client.chat.completions.parse({
    model: 'gpt-4o-2024-08-06',
    messages: [
      { role: 'system', content: 'You are a helpful assistant analyzing transcripts.' },
      { role: 'user', content: transcript },
    ],
    response_format: zodResponseFormat(TranscriptAnalysisSchema, 'transcript_analysis'),
  });

  const message = completion.choices[0]?.message;
  if (message?.parsed) {
    return message.parsed;
  } else {
    throw new Error('Failed to parse transcript analysis');
  }
}
