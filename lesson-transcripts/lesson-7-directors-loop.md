Let the Code Write Itself
The Director Pattern

The Director Pattern, also known as the Director Loop, is an agentic workflow. In this pattern, you define a context, a prompt, and a model as usual, but you also define an execution command and an evaluator. These are the two missing pieces required to close the loop.

Your execution command runs immediately after your AI coding assistant generates code. The evaluator then takes the output of that execution command and determines if the task is complete. If the task is not finished, the evaluator creates feedback and loops back to the AI assistant, closing the loop. While an evaluator can be a simple piece of code, we focus on evaluators that are LLM calls themselves—a pattern often called "LLM-as-a-Judge." By using one LLM to grade the output of another, we close the loop. You can now write a prompt, have the assistant generate code, execute that code, and evaluate it. If the evaluation fails, the feedback is passed back to the assistant to try again. This pattern is the prototype for the future of AI: letting the code write itself.

Approaching the Edge of Engineering

By building upon the patterns we have established—specifically the AI developer workflow and the Spec Prompt—we close the loop by providing the AI assistant with feedback through an evaluator function. With this pattern, even in its early form, we are approaching the edge of AI coding and, potentially, the edge of software engineering as we know it.

This pattern enables AI coding tools to act autonomously, solving problems iteratively until they are complete. Next-generation tools like Devin and GitHub Copilot Workspace rely on autonomous patterns similar to the Director Pattern.

Moving Up the Stack

We are becoming curators of code and workflows. As lead engineers and engineering managers, we are moving ourselves "up the stack." We are handing off low-level code, the minute details, and the "how" to AI coding assistants. We are operating as a small AI agent team.

The Director Pattern requires a deep understanding of your codebase and the expertise to plan work in advance. Spec documents and AI workflows don't matter if you cannot plan the future end-to-end—or at least a significant chunk of it. When you learn when to use the Director Pattern, you will realize how powerful it is.

The Future of Planning

A massive side effect of improving models and tools like Aider is that we can now plan much more work than we previously thought possible. This is especially true with next-generation reasoning models.

The pattern of "code that sees its own output" hints at the future of programming. Engineers who understand exactly what they want to accomplish from start to finish can hand off nearly the entire process to a self-directed AI assistant. This shift means:

Planning is the key to great engineering.

Knowing how to evaluate work is the key to leadership.

Writing high-quality prompts, gathering context, and selecting models are the foundational skills of the modern engineer.

The implication of the Director Pattern, the Spec Prompt, and AI-driven workflows is that you can now wield an AI assistant like never before.

Limitations and Critical Success Factors

The largest limitation of this pattern is the feedback loop: if your execution command does not provide clear feedback output, the pattern will fail. In addition to writing the prompt and planning the "Big Three" tasks, it is now your job to create solid feedback mechanisms.

The most important takeaway is this: Great Planning is Great Prompting. Closing the loop is only efficient if your plans are packed with high-quality prompts. This is a continuing trend in the age of Generative AI. Those who can plan more extensively, write clearly, and translate their thoughts into LLM-compatible formats—like the Spec Prompt—will achieve asymmetric results.

Conclusion

These are techniques you can use right now. The most important thing you can do is start. Practice these patterns. You will feel your engineering focus shift from the "how" to the "what."

Internalize the fact that Great Planning is Great Prompting. If you are ready to close the loop and let the code write itself, take the Director Pattern and make it your own. Fine-tune it and tweak it to fit the codebases you work in every day.