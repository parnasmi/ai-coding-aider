# Aider Has A Secret
> Learn how to use Aider to build reusable AI Developer Workflows
## Setup
- Install dependencies: `uv sync`
- Copy `env.sample` to `.env` and set your OPENAI_API_KEY and ANTHROPIC_API_KEY
- Run the script:
  - `uv run main analyze-transcript transcript.txt`
  - `uv run main analyze-transcript transcript.txt -output-file output_transcript.yaml`
- Run the server: `uv run server`
- Run ai developer workflows
  - `uv run python adw/versioning.py` or `sh adw/versioning.sh`
  - `uv run python adw/*.py`