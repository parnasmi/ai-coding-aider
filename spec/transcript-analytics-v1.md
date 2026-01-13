# Transcript Analytics Updates: Chart and Output File

**(TypeScript / Node.js Spec)**

---

## High-Level Objective

* Add charting and output file functionality to the CLI transcript analytics application.

---

## Mid-Level Objective

* Add bar, pie, and line chart capabilities in a new **TypeScript chart module**.
* Add output file formatting functionality in a new **TypeScript output module**.
* Add two new CLI args: `--chart` and `--output-file`.

---

## Implementation Notes (TS / Node Adjusted)

* Use **Node.js + TypeScript**
* Use **existing dependencies only** from `package.json`

  * Charting via **canvas** (already installed)
* Output file extensions supported:

  * `.txt`
  * `.json`
  * `.md`
  * `.yaml`
* Chart types:

  * `bar`
  * `pie`
  * `line`
* Charts must be saved as `.png`
* Follow Low-Level Tasks **in order and in detail**
* CLI args parsed via `process.argv`

---

## Context

### Beginning Context

* `./spec_based_ai_coding/mainSpec.ts`
* `./spec_based_ai_coding/dataTypesSpec.ts` (readonly)
* `package.json` (readonly)

---

### Ending Context

* `./spec_based_ai_coding/mainSpec.ts`
* `./spec_based_ai_coding/dataTypesSpec.ts` (readonly)
* `package.json` (readonly)
* `./spec_based_ai_coding/chartSpec.ts` (new file)
* `./spec_based_ai_coding/outputFormatSpec.ts` (new file)

---

## Low-Level Tasks

> Ordered from start to finish

---

### 1. Create output format functions

```aider
CREATE ./spec_based_ai_coding/outputFormatSpec.ts:
    CREATE functions:

    formatAsTxt(
        transcriptAnalysis: TranscriptAnalysis,
        wordCounts: WordCounts
    ): string

    formatAsJson(...): string
    formatAsMd(...): string
    formatAsYaml(...): string
```

**Notes:**

* Return formatted string output only
* File writing handled in `mainSpec.ts`
* `.yaml` output should be valid YAML text

---

### 2. Create chart functions

```aider
CREATE ./spec_based_ai_coding/chartSpec.ts:
    CREATE functions:

    createBarChart(wordCounts: WordCounts): void
        - horizontal bar chart
        - sorted descending (top to bottom)
        - top quartile → green
        - bottom quartile → red
        - remaining → blue
        - save as .png

    createPieChart(wordCounts: WordCounts): void
        - MIRROR createBarChart logic

    createLineChart(wordCounts: WordCounts): void
        - MIRROR createBarChart logic
```

**Notes:**

* Use `canvas` for drawing
* Save charts to disk
* No CLI logic inside chart functions

---

### 3. Update main CLI to use new features

```aider
UPDATE ./spec_based_ai_coding/mainSpec.ts:
    ADD CLI args:
        --chart <bar|pie|line>
        --output-file <path>

    USE outputFormatSpec functions:
        - Choose formatter based on file extension
        - Write output to disk

    USE chartSpec functions:
        - Invoke chart generation based on --chart arg
```

**CLI behavior:**

* `--output-file` determines formatter by extension
* Unsupported extensions must error
* `--chart` is optional
* Both options may be used together

