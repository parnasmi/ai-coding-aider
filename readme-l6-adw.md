
# Aider Has a Secret

> Learn how to use Aider to build reusable **AI Developer Workflows (ADW)** in Node.js

---

## What This Lesson Is About

This lesson demonstrates that **Aider is not just an interactive CLI tool**.

It can be:

* executed programmatically
* embedded into scripts
* used to automate entire classes of engineering work

This pattern is called an **AI Developer Workflow (ADW)**.

---

## Setup

### 1. Install dependencies

```bash
npm install
```

> Make sure `aider` is installed globally and available in your PATH.

---

### 2. Environment variables

Create a `.env` file in the project root:

```bash
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

(Anthropic is optional unless explicitly used.)

---

## Run the CLI Transcript Analyzer

From project root:

```bash
npx tsx spec_based_ai_coding/mainSpec.ts transcript.txt
```

With output file:

```bash
npx tsx spec_based_ai_coding/mainSpec.ts transcript.txt 10 --output-file output_transcript.yaml
```

---

## Run AI Developer Workflows (ADW)

AI Developer Workflows live in the `adw/` directory.

Each file is a **standalone automation script** that runs Aider programmatically.

### Version bump workflow

```bash
npx tsx adw/versioning.ts
```

Specify bump type:

```bash
npx tsx adw/versioning.ts patch
npx tsx adw/versioning.ts minor
npx tsx adw/versioning.ts major
```

This will:

* open `package.json` as editable context
* load `README.md` as read-only context
* instruct Aider to bump the version automatically

---

## Run All ADWs

```bash
npx tsx adw/*.ts
```

Each workflow:

* defines its own scope
* controls editable vs read-only files
* runs non-interactively

---

## Key Concept: Aider as an Engine

In this lesson, Aider is treated as:

* a **programmable refactoring engine**
* not just a chat-based assistant
* not just an IDE plugin

Each ADW:

* defines **context**
* defines **constraints**
* defines **intent**
* executes deterministically

---

## Folder Structure

```
.
├── adw/
│   ├── versioning.ts
│   └── ...
├── spec_based_ai_coding/
│   ├── mainSpec.ts
│   ├── llmSpec.ts
│   ├── wordCounterSpec.ts
│   └── ...
├── package.json
├── README.md
└── .env
```

---

## Why This Matters

Instead of:

* manually refactoring
* repeating the same AI tasks
* trusting opaque autonomy

You build:

* repeatable workflows
* safe automation
* scalable engineering processes

This is the foundation for **AI-powered engineering systems**, not just AI-assisted coding.
