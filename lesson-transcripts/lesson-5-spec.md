## Spec-Based AI Coding

### The Spec Directory

The **spec directory** is a dedicated folder where you store your specification files. This is the "brain" of your project—the central place where your plans live. A high-quality spec document is divided into several critical sections that compound to create a perfect execution plan.

### 1. High-Level Objective

At the very top, we define the "what."

* **Example:** "Create a CLI transcript analytics application."

### 2. Mid-Level Objectives

This section contains detailed bullet points that provide more information for the reasoning model and the AI coding assistant. When writing these, imagine what you would communicate to another engineer if you were handing off a plan for them to execute.

### 3. Implementation Notes

This is where you add technical details, dependencies, coding standards, and specific rules. It allows you to be prescriptive about minor tweaks or constraints you want the assistant to follow. By guiding the reasoning model here, you ensure the code aligns with your specific architecture.

### 4. Context

The Context section defines the exact context window for the task.

* **Beginning Context:** The files the model must have available at the start.
* **Ending Context:** The files that should exist or be modified by the end of execution.
This helps you, the engineer, work through exactly what is expected from start to finish.

### 5. Low-Level Tasks (The Prompt Chain)

This is the most important section. It is a numbered list of tasks, where each entry serves as a specific prompt.

* **Ordered Execution:** Tasks are ordered from start to finish, allowing outcomes to stack and compound.
* **Referential Integrity:** Because they are ordered, you can refer to the content of previous prompts in later tasks.
* **Internal Chain of Thought:** The reasoning model uses these tasks to run its own internal "prompt chain" to generate massive amounts of code accurately.

---

## The Power of Information-Rich Language

### Type-Based AI Coding

As discussed in previous lessons, **types, interfaces, and classes** are "Information Density Keys" (IDKs). They provide strong reference points and meaning that LLMs understand perfectly. Speaking in this consistent, information-rich language allows every piece of compute—from your autocompleter to your architect model—to understand exactly what you need.

### The Architect Pattern

This technique uses a "Draft Prompt" (the Spec) and an "Execution Prompt" (the Aider run). While waiting for a reasoning model to return results might seem like a disadvantage, it actually frees you up to think ahead and prepare your next specification or set up your secondary assistant for iterations.

### Transitioning to the Future

To truly master AI coding, you must invest more time upfront in communication and planning.

* **The 80/20 Rule:** Initially, a spec might get you 80% of the way there. As you improve your prompts and context selection, you will hit 85%, 90%, and eventually 100%.
* **The "Aha" Moment:** The moment you write a perfect spec prompt and the LLM executes 10 to 20 complex edits at once is the moment you transform into an engineer of the future.

**Great Planning is Great Prompting.** By shifting your effort from manual coding to high-level architectural planning, you maintain control of the product while achieving asymmetric results.
