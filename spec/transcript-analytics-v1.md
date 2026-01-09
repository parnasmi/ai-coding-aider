# Transcript Analytics Updates: Chart and Output File

## High-Level Objective

- Add charting and output file functionality to the CLI transcript analytics application.

## Mid-Level Objective

- Add a bar, pie, and line chart capabilities in a new chart. py file.
- Add output file functionality to a new output.py file.
- Add two new cli args: '--chart' and '--output-file' to our typer method.

## Implementation Notes

- Use matplotlib for charting.
- Be sure the output file using the correct file extension.
- Output file options are: txt, •json, -md, • yaml.
- Chart types are: bar, pie, line.
- Be sure to follow the Low-Level Tasks in order and in detaul.!

## Context

### Beginning context

- `src/spec_based_ai_coding/main.py`
- `src/spec_based_ai_coding/data_types-py`
(readonly)
- `pyproject.toml` (readonly) 

### Ending context

-`src/spec_based_ai_coding/main.py`
- `src/spec_based _ai_coding/data_types-py`
(readonly)
- `pyproject.toml` (readonly)
- `src/spec_based_ai_coding/chart-py` (new file)
- `src/spec_based_ai_coding/output_format-py` (new file)