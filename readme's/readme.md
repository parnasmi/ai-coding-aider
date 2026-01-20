# Transcript Analytics v0 — TypeScript / Node.js

CLI tool to:
- Count word frequencies in a transcript file (filters common words and applies a min-count threshold).
- Analyze the transcript and word counts using an OpenAI chat completion with structured output (zod).

Requirements:
- Node.js v18+
- Dependencies pre-installed (see package.json)
- OPENAI_API_KEY environment variable set

Setup:
- Install dependencies: npm install
- Set your API key (Mac/Linux): export OPENAI_API_KEY="sk-..."
  - Windows (PowerShell): setx OPENAI_API_KEY "sk-..." (restart shell)

Run:
- npx tsx spec_based_ai_coding/mainSpec.ts <path-to-transcript> [minCountThreshold]
- Example: npx tsx spec_based_ai_coding/mainSpec.ts ./transcript.txt 10

Output:
- Word frequencies printed as "<word>: ###"
- Followed by a structured transcript analysis object (matching zod schema)
