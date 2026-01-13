# Transcript Analytics Updates: Chart and Output File

## High-Level Objective

- Add charting and output file functionality to the CLI transcript analytics application.

## Mid-Level Objective

- Add a bar, pie, and line chart capabilities in a new chart.py file.
- Add output file functionality to a new output.py file.
- Add two new cli args: '--chart' and '--output-file' to our typer method.

## Implementation Notes

- Use matplotlib for charting.
- Be sure the output file using the correct file extension.
- Output file options are: .txt, .json, .md, .yaml.
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
- `src/spec_based_ai_coding/data_types-py`
(readonly)
- `pyproject.toml` (readonly)
- `src/spec_based_ai_coding/chart.py` (new file)
- `src/spec_based_ai_coding/output_format.py` (new file )

## Low-Level Tasks
> Ordered from start to finish

1. Create output format functions.
```aider
CREATE src/spec_based_ai_coding/output_format.py:
    CREATE format_as_str(transcript_analysis: TranscriptAnalysis, word_counts: WordCounts) → str,
        format_as_json(...),
        format_as_md (...),
        format_as_yaml(...)
```

2. Create chart functions.
```aider
CREATE src/spec_based_ai_coding/chart.py:
    CREATE create_bar_chart(word_counts: WordCounts) :
        horizontal bar chart, desc top to bottom, 
        top quartile green, 
        bottom quartile red, 
        remaining blue, 
        save as -png,
    create_pie_chart(...): MIRROR create_bar_chart, 
    create_line_chart (...): MIRROR create_bar_chart
```

3. Update main to use the new functions.
```aider
UPDATE src/spec_based_ai_coding/main.py:
    ADD --chart and --output-file cli args,
    USE output_format.py functions and write to a extension appropriate file,
    USE chart.py functions based on cli arg,
```