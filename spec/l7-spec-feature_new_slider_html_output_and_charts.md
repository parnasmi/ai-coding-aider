# HTML Slider Output and Charts Feature (TypeScript)

## High-Level Objective

- Create an interactive HTML output format with dynamic word frequency visualization

## Mid-Level Objective

- Build a new HTML output format with slider-based word frequency filtering
- Add radial bar and bubble chart visualizations for word frequencies
- Extend the CLI to support new output formats
- Ensure comprehensive test coverage

## Implementation Notes

- Do NOT add new external dependencies
- Use existing TypeScript utilities and patterns
- Comment every new function
- Maintain type safety
- Use inline JavaScript inside HTML output (no external JS files)
- Use Vitest for testing
- For CLI commands, add usage examples starting with `npx tsx mainSpec.ts`

## Context

### Beginning context
- `let_the_code_write_itself/outputFormatSpec.ts`
- `let_the_code_write_itself/chartSpec.ts`
- `let_the_code_write_itself/mainSpec.ts`
- `let_the_code_write_itself/tests/outputFormatSpec.test.ts`
- `let_the_code_write_itself/tests/chartSpec.test.ts`

### Ending context
- `let_the_code_write_itself/outputFormatSpec.ts`
- `let_the_code_write_itself/chartSpec.ts`
- `let_the_code_write_itself/mainSpec.ts`
- `let_the_code_write_itself/tests/outputFormatSpec.test.ts`
- `let_the_code_write_itself/tests/chartSpec.test.ts`

## Low-Level Tasks
> Ordered from start to finish

### 1. Add new HTML output format with slider

```aider
UPDATE let_the_code_write_itself/outputFormatSpec.ts:
  CREATE formatAsHtmlWithSliderFilter() function:
    Add HTML template with slider control
        Add JavaScript for dynamic filtering
        MIRROR formatAsHtml()
```

### 2. Add new chart visualizations
```aider
UPDATE let_the_code_write_itself/chartSpec.ts:
  CREATE createRadialBarChart(word_counts: WordCounts), createBubbleChart(...)
```

### 3. Update CLI interface
```aider
    UPDATE let_the_code_write_itself/mainSpec.ts:
    ADD support for checking .htmlsld extension and calling formatAsHtmlWithSliderFilter()
        Be sure to use .html when saving the file, .htmlsld is just for checking
    ADD support for 'radial' and 'bubble' choices and calling respective chart functions
```

### 4. Add comprehensive tests
```aider
     UPDATE test files:
        ADD testFormatAsHtmlWithSliderFilter()
        ADD testCreateRadialBarChart()
        ADD testCreateBubbleChart()
```
