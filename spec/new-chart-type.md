# Transcript Analytics – New Chart Type Specification
> Ingest the information from this file, implement the Low-Level Tasks, and generate the code that will satisfy the High and Mid-Level Objectives.

## High-Level Objective

- Add a new chart type to the transcript analytics application.

## Mid-Level Objective

- Implement a new chart function in `chartSpec.ts` based on the provided description.
- Update the CLI application to support generating the new chart type.
- Ensure the new chart integrates smoothly with existing functionality.

## Implementation Notes

- Use only the dependencies listed in `package.json`.
- Use `canvas` for rendering charts.
- Comment every function thoroughly.
- Carefully review each low-level task for precise code changes.

## Context

### Beginning Context

- `spec_based_ai_coding/mainSpec.ts`
- `spec_based_ai_coding/chartSpec.ts`
- `package.json` (readonly)

### Ending Context

- `spec_based_ai_coding/mainSpec.ts` (updated)
- `spec_based_ai_coding/chartSpec.ts` (updated)
- `package.json`

## Low-Level Tasks
> Ordered from start to finish

1. Create a New Chart Function:

    UPDATE spec_based_ai_coding/chartSpec.ts:
        ADD a new function:
            create_<chart_type>_chart(wordCounts: WordCounts)

    Implement the chart based on the following description:
    <description>

2. Update the CLI Application:

    UPDATE spec_based_ai_coding/mainSpec.ts:
        UPDATE the chart handling logic:
            ADD the new chart type to the chartType parameter
            Call the new chart function when selected