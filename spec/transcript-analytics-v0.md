# Transcript Analytics v0 — TypeScript / Node.js Specification

## High-Level Objective

- Create a CLI transcript analytics application

## Mid-Level Objective

- Build a TypeScript Node.js CLI application
- Accept a path to a text file
- Count the frequency of each word in a file, filter out common words, and limit by count threshold
- Use an OpenAI chat completion with structured output to analyze the transcript and word counts
- Print:
    - word frequencies
    - transcript analysis to the terminal

## Implementation Notes
- Use Node.js + TypeScript
- Use only libraries already present in package.json
- Use zod for runtime-validated structured outputs
- Use process.argv or a lightweight CLI pattern (no Typer)
- Comment every function
- When code blocks are provided in low-level tasks, use them without modification
- Carefully review each low-level task for exact code changes

## Context

### Beginning context

- `./spec_based__ai_coding/mainSpec.ts`
- `package.json` (readonly) 


### Ending context

- `./spec_based_ai_coding/mainSpec.ts`
- `package.json`
- `./spec_based_ai_coding/llmSpec.ts` (new file)
- `./spec_based_ai_coding/wordCounterSpec.ts` (new file)
- `./spec_based_ai_coding/dataTypesSpec.ts` (new file)
- `./spec_based_ai_coding/constantsSpec.ts` (new file)


## Low-Level Tasks
> Ordered from start to finish

1. Create common word blacklist.
```aider
CREATE ./spec_based_ai_coding/constantsSpec.ts:
    EXPORT const COMMON_WORDS_BLACKLIST = [
      'the', 'and', 'is', 'to', 'of', 'a', 'in', 'that', 'it', 'on',
      ...add 50 more common English words
    ]
```

2. Create our data types.
```aider
CREATE ./spec_based_ai_coding/dataTypesSpec.ts:
    CREATE TypeScript types and zod schemas:

    EXPORT type WordCounts = {
        countToWordMap: Record<string, number>
    }

    EXPORT type TranscriptAnalysis = {
        quick_summary: string
        bullet_point_highlights: string[]
        sentiment_analysis: string
        keywords: string[]
    }

    EXPORT const TranscriptAnalysisSchema = z.object({
        quick_summary: z.string(),
        bullet_point_highlights: z.array(z.string()),
        sentiment_analysis: z.string(),
        keywords: z.array(z.string())
    })

```

3. Create our word counter & filter out & limit by count threshold.
```aider
CREATE ./spec_based_ai_coding/wordCounterSpec.ts:
    CREATE function wordCounter(
        script: string,
        minCountThreshold: number = 10
    ): WordCounts

    - Remove punctuation
    - Convert all words to lowercase
    - Split by whitespace
    - Filter words using COMMON_WORDS_BLACKLIST
    - Count word occurrences
    - Only include words with count > minCountThreshold
    - Sort results descending by count

```

4. Create our LLM function using the code block below.
```js
# CREATE ./spec_based_ai_coding/llmSpec.ts: Use code block below no changes.

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
```


5. Update our main function to use new count and analysis functions.
```aider
UPDATE ./spec_based_ai_coding/mainSpec.ts:
    CREATE a Node.js CLI entry point:

    - Parse arguments from process.argv:
        pathToTranscriptFile
        minCountThreshold (default 10)

    - Read file using fs/promises
    - Run wordCounter
    - Run analyzeTranscript
    - Print results to terminal:
        <word>: ###
        where ### is count

```

6. Create readme.md file which is documentation of the application which has all implementation details implemented so far and instructions how to use this application.
