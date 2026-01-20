
# Let The Code Write Itself
> Self Directed AI Coding

## Setup

- Install dependencies: `bash uv sync`

- Copy `.env.sample` to `.env` and set your `OPENAI_API_KEY` and `ANTHROPIC_API_KEY`

- Run the script:
  - `uv run main analyze-transcript transcript.txt`
  - `uv run main analyze-transcript transcript.txt --chart-type bar`
  - `uv run main analyze-transcript transcript.txt --output-file output_transcript.yaml`
- Run director:
  - `uv run python director.py --config specs/director_green_output_format.yaml`
