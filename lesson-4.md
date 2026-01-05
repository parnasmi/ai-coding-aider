## How to Suck at AI Coding: Common Pitfalls and Practical Solutions

When your AI coding tools hallucinate or cause an issue, one of your three core elements is likely off and needs to be addressed. This lesson is about fine-tuning your scope so you become an AI Coding Sniper and always hit the three bullseyes by avoiding common pitfalls that chew up your performance time and engineering output.

After we discuss pitfalls and their solutions, we'll focus on boosting your capabilities over the long term by digging into new aspects of your AI coding assistant.

Let's turn our attention to the principle for this lesson:

**Balance, then boost. First, do it. Then, do it right. Then, make it fast.**

In Lessons 1, 2, and 3, we learned *how to do it*. In this lesson, we focus on *doing it right*.

When you're coding with AI, you first want to align your "big three" bullseyes by balancing your prompt, context, and model. Then, it's all about boosting your capabilities by mastering your AI tooling and pushing it to its limits.

Let's break down common pitfalls for AI coding as well as their solutions. These are issues you're going to see again and again, even with next-generation language models and great AI tools. But after this lesson, you'll know exactly how to fix them as soon as they happen, and how to prevent them from happening in the first place.

---

### Context

#### Missing Context
- **Setup**: `aider src/transcript_analytics/main.py src/transcript_analytics/output_format.py`
- **Prompt**: `ADD a new output format toml`

#### Excess Context
- **Setup**: `aider *,* **/**.py*`
- **Prompt**: `Update the analyze_transcripts_v2 function to include additional logging and sentiment analysis and the next type version`

### Prompt

#### Too High-Level
- **Setup**: `aider **/**.py*`
- **Prompt**: `Enhance the visualization of our data top and bottom`

#### Too Low-Level
- **Setup**: `aider **/**.py`
- **Prompt**:
    ```
    UPDATE chart.py: word_count_bar_chart():
    UPDATE the top quartile of data to be green,
    the bottom quartile red, the remaining blue
    ```

### Model

#### Using a Weak Model
- **Setup**: `aider -model gpt-4o-mini **/**.py*`
- **Prompt**: `ADD a new output format toml`

#### Overkill Model
- **Setup**: `aider --model claude-3-5-sonnet-20241022 **/**.py*`
- **Prompt**: `UPDATE word_count_*() MAKE top quartile green, bottom red, rest blue`

---

Now you know the most common ways you're likely to make mistakes with your AI coding assistants. You also know how to fix them.

**Balance, then boost.**

First, make sure your Prompt, Context, and Model are aligned. Always start by writing low-level prompts, using IDs and prompt phrases to write high-quality prompts. As you progress, you can play with mid- to high-level prompts to save time. But when you get issues with high-level coding prompts or missing details, always shift yourself to a low-level focus on getting things done—not saving a couple of keystrops here and there.

Then, add all the context you need to solve the problem you're working on. Think about context from the perspective of your AI coding assistant. Before you even prompt, think: "With this context and this prompt, would I be able to solve this problem?" Imagine your PM or a fellow engineer asked you to do something and gave you exactly this context and prompt. Would you be able to solve it?

Don't overuse reasoning models and don't go cheap on your base language model. Right now, GPT-4o and Claude 3.5 Sonnet are solid, high-performance base models. This will change in the future, but what `aider` sets up as defaults is highly recommended.

In our next lesson, we're going to run powerful reasoning models to generate tons of code with a couple of new techniques that will expand the size of the swim you can take with your AI coding tools. We'll show how planning is the key to shipping massive amounts of code.

