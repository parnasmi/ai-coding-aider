## Know Your IDKs

### IDK Words

- Create, Update, Delete  
- Add, Remove, Move, Replace, Save, Mirror, Make
- Var, Function, Class, Type, File, Default  

---

## Lesson 3 Prompts

### Save OpenAI Summary in Proper File Format (via CLI Arg)

```

dataTypes.ts llm.ts main.ts

```

- **CREATE** `outputFormat.ts`:
  - **CREATE** function  
    `formatAsStr(transcript: TranscriptAnalysis) -> string`
  - `formatAsJson(...)`
  - `formatAsMarkdown(...)`

- **UPDATE** `main.ts`:
  - **ADD** a CLI arg for file output format  
  - **DEFAULT** format is text  
  - Save output to a file with the proper extension

---

```

dataTypes.ts llm.ts main.ts argParse.ts

```

- **MOVE** output format CLI arg into `argParse.ts`

---

### Ultra Definition Pattern

```

function formatAsStr(transcript: TranscriptAnalysis) -> string

```

This is the **ultra definition pattern** — especially when the function name and context are strong enough for the model to infer the function’s behavior on its own.

You can avoid writing tons of code by providing only the function definition. Hold on to this idea.

Using list syntax with commas is powerful. LLMs are great at pattern recognition.

When we work through this, there is actually a lot of information we are sending to the AI coding assistant in the prompt. We stay clear and concise without going into details of *how* to do it. 

**Remember:**  
**WHAT > HOW**

Not completely — but *much, much more* than it used to be.

---

### Prompting Progression

The general theme when learning AI coding:

- Start with **low-level prompts**
- As you progress, **slowly remove information**
- Early on, write extra characters
- Communicate clearly with LLMs
- Most importantly, communicate clearly with yourself

Know exactly what output you want by creating low-level prompts first.

---

## Update Transcript Analysis: Bar Chart Output

### Goal
Replace pseudo hashtag characters with a real bar chart for word frequencies.

### Prompt

```

package.json src/main.ts

```

- **CREATE** `chart.ts`:
  - **CREATE** function  
    `wordCountBarChart(threshold_word_count: object)`
  - Show a horizontal bar chart
  - Sort descending

- **UPDATE** `main.ts`:
  - **REPLACE** word count print logic with `wordCountBarChart`
  - **MOVE** threshold logic **after** the word loop

---

This is a great example of a **repeatable, consistent prompt**.

All we are doing with this pattern is consistently communicating to the LLM and AI coding assistant **WHERE** and **WHAT**.

Notice we did **not** say *how* to create the bar chart.

We added the right context, and the model inferred the rest.

This is a critical pattern you will see throughout the course.

You get:
- An idea
- A feature
- Requirements for a brand new feature

Now you have a repeatable structure for writing prompts that produce great results.

---

## The Big Three Bullseye

The game becomes how much time you trade off to hit the **Big 3 bullseye**:

- Right context
- Right model
- Right prompt

How much time do you spend setting up that intersection and crafting information-dense keyword prompts with a repeatable structure like:

```

LOCATION (CREATE chart.ts)
→ ACTION (CREATE)
→ DETAIL (function wordCountBarChart...)

```

---

### Follow-up Prompts

```

package.json src/chart.ts src/main.ts transcript-3.txt

```

- **UPDATE** `defaultThreshold` to **DEFAULT 10**
- **MOVE** `wordCountBarChart` below `analyzeTranscript`

---

```

package.json src/arg_parse.ts src/chart.ts src/main.ts transcript-3.txt

```

- **UPDATE** `wordCountBarChart` to sort **ascending**

---

## MIRROR Keyword Example

We now run a prompt using the powerful **MIRROR** keyword.

### Prompt

```

package.json src/arg_parse.ts src/main.ts src/outputFormat.ts

```

- **UPDATE** `main.ts`, `outputFormat.ts`, `arg_parse.ts`:
  - **ADD** `formatAsYaml()`
  - **MIRROR** `formatAsJson`

---

## Final Takeaway

By crafting low-level prompts before moving to high-level prompts, and by using **IDKs** and **prompt phrases**, you can consistently build high-quality, accurate AI coding prompts.

You are building the skills needed to **control and guide** AI coding assistants to produce the results you are trying to get.

