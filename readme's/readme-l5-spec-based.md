# Spec-Based AI Coding

> Learn to generate large, coherent codebases using **spec-based AI coding** with architect + editor models.

This folder contains a **clean reimplementation** of the transcript analytics project using **spec-driven prompts** and **Aider’s architect/editor workflow**, following Lesson 5 of *Principled AI Coding*.

The goal is not incremental edits, but **full-system generation from specifications**.

---

## Setup

- Install dependencies `npm install`
- Start aider in architect mode: 
    - With OpenAI + Gemini flash (**Recommended**): `aider --model openai/gpt-5 --architect --editor-model gemini/gemini-3-flash-preview`
    - With OpenAI: `aider openai/gpt-5 -architect`
- Use a 'clean up' aider instance for fast code changes: `aider --model gemini/gemini-3-flash-preview` or `aider`
- OR:
1. Set a "Fast" Alias
```bash
# Add to .aider.conf.yml
alias:
  - "fast:gemini/gemini-3-flash-preview"
```
Then run: `aider --model fast`

2. Force "Low" Thinking Level

For even faster execution during simple cleanup tasks (like converting JSON to YAML or simple refactors), you can instruct the model to use its minimal thinking mode to reduce latency further. You can add this to your model settings:

```bash
# .aider.model.settings.yml
- name: gemini/gemini-3-flash-preview
  extra_params:
    thinking_config:
      thinking_level: "low"
```

### How to use gemini-flash-3 it as your Main Architect

If you want to test if it "nails" your specific fintech logic, use this command to put it in the driver's seat for both planning and editing:

```bash
aider --model gemini/gemini-3-flash-preview --architect
```

