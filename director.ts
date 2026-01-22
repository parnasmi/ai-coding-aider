import { execSync } from "child_process";
import { readFileSync, existsSync, appendFileSync } from "fs";
import * as path from "path";
import * as yaml from "js-yaml";
import OpenAI from "openai";
import { z } from "zod";

/* ================================
   Types & Schemas
================================ */

const EvaluationResultSchema = z.object({
  success: z.boolean(),
  feedback: z.string().nullable(),
});

type EvaluationResult = z.infer<typeof EvaluationResultSchema>;

const DirectorConfigSchema = z.object({
  prompt: z.string(),
  coder_model: z.string(),
  evaluator_model: z.enum(["gpt-5.2", "gpt-5"]),
  max_iterations: z.number(),
  execution_command: z.string(),
  context_editable: z.array(z.string()),
  context_read_only: z.array(z.string()),
  evaluator: z.literal("default"),
});

type DirectorConfig = z.infer<typeof DirectorConfigSchema>;

/* ================================
   Director
================================ */

export class Director {
  private config: DirectorConfig;
  private llmClient: OpenAI;
  private logFile: string;

  constructor(configPath: string) {
    this.config = this.validateConfig(configPath);
    this.llmClient = new OpenAI();
    this.logFile = path.join(process.cwd(), "director.log");

    console.log(" this.config", this.config);
  }

  /* ================================
     Inferred Utility Methods
  ================================ */

  private validateConfig(configPath: string): DirectorConfig {
    const fullPath = path.resolve(configPath);

    if (!existsSync(fullPath)) {
      throw new Error(`Config file not found: ${fullPath}`);
    }

    const ext = path.extname(fullPath).toLowerCase();
    const raw = readFileSync(fullPath, "utf-8");

    // ---------- Markdown spec ----------
    if (ext === ".md") {
      this.fileLog("📄 Loading Markdown spec file");

      // You must still provide defaults somewhere sensible
      return DirectorConfigSchema.parse({
        prompt: raw,
        coder_model: "openai/gpt-5",
        evaluator_model: "openai/gpt-5",
        max_iterations: 5,
        execution_command: "npm test",
        context_editable: [],
        context_read_only: [],
        evaluator: "default",
      });
    }

    // ---------- YAML spec ----------
    if (ext === ".yaml" || ext === ".yml") {
      const parsed = yaml.load(raw);
      return DirectorConfigSchema.parse(parsed);
    }

    throw new Error(
      `Unsupported config format '${ext}'. Use .yaml, .yml, or .md`,
    );
  }

  /**
   * Extract JSON safely from an LLM response
   */
  private parseLLMJsonResponse(response: string): string {
    const start = response.indexOf("{");
    const end = response.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("No JSON object found in evaluator response");
    }

    return response.slice(start, end + 1);
  }

  /**
   * File + console logging
   */
  private fileLog(message: string, printMessage: boolean = true) {
    const line = `[${new Date().toISOString()}] ${message}\n`;
    appendFileSync(this.logFile, line);

    if (printMessage) {
      console.log(message);
    }
  }

  /* ================================
     Director Core
  ================================ */

  private createNewAICodingPrompt(
    iteration: number,
    basePrompt: string,
    executionOutput: string,
    evaluation: EvaluationResult,
  ): string {
    if (iteration === 0) {
      return basePrompt;
    }

    return `
              # Generate the next iteration of code based on feedback.

              ## Attempt ${iteration + 1}
              You have ${this.config.max_iterations - iteration} attempts remaining.

              ## Original Instructions
              ${basePrompt}

              ## Previous Execution Output
              ${executionOutput}

              ## Feedback
              ${evaluation.feedback}
            `.trim();
  }

  /**
   * Run Aider to generate / update code
   */
  private aiCode(prompt: string) {
    const commandParts = [
      "aider",
      "--model",
      this.config.coder_model,
      "--yes",
      "--no-auto-commits",
      "--no-suggest-shell-commands",
      ...this.config.context_editable,
      ...this.config.context_read_only.flatMap((f) => ["--read", f]),
      "--message",
      JSON.stringify(prompt),
    ];

    const command = commandParts.join(" ");

    this.fileLog("🤖 Running AI coding assistant...");

    execSync(command, {
      stdio: "inherit",
      env: process.env,
    });
  }

  /**
   * Execute user-defined command (tests, script, etc.)
   */
  private execute(): string {
    this.fileLog(`💻 Executing: ${this.config.execution_command}`);

    try {
      const output = execSync(this.config.execution_command, {
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "pipe"],
      });

      this.fileLog(`Execution output:\n${output}`, false);
      return output;
    } catch (err: any) {
      // execSync throws on non-zero exit code — we must capture output
      const stdout = err.stdout?.toString() ?? "";
      const stderr = err.stderr?.toString() ?? "";
      const combined = `${stdout}\n${stderr}`;

      this.fileLog(
        `Execution failed (non-zero exit). Captured output:\n${combined}`,
        false,
      );

      // IMPORTANT: return output instead of throwing
      return combined;
    }
  }

  /**
   * LLM-as-judge evaluator
   */
  private async evaluate(executionOutput: string): Promise<EvaluationResult> {
    if (this.config.evaluator !== "default") {
      throw new Error(`Evaluator '${this.config.evaluator}' not implemented`);
    }

    const editableFiles = Object.fromEntries(
      this.config.context_editable.map((f) => [
        path.basename(f),
        readFileSync(f, "utf-8"),
      ]),
    );

    const readOnlyFiles = Object.fromEntries(
      this.config.context_read_only.map((f) => [
        path.basename(f),
        readFileSync(f, "utf-8"),
      ]),
    );

    const evaluationPrompt = `
                                Evaluate this execution output and determine if it was successful based on the execution command, the user's desired result,

                                ## Checklist:
                                - Is the execution output reporting success or failure?
                                - Did we miss any tasks? Review the User's Desired Result to see if we have satisfied all tasks.
                                - Did we satisfy the user's desired result?
                                - Ignore warnings

                                ## User Desired Result
                                ${this.config.prompt}

                                ## Editable Files
                                ${JSON.stringify(editableFiles, null, 2)}

                                ## Read-Only Files
                                ${JSON.stringify(readOnlyFiles, null, 2)}

                                ## Execution Command
                                ${this.config.execution_command}

                                ## Execution Output
                                ${executionOutput}


                                ## Response Format:
                                  > Be 100% sure to output JSON.parse compatible JSON.
                                  > That means no new lines.


                                
                                Return a structured JSON response with the following structure: {
                                  success: bool - true if the execution output generated by the execution command matches the Users Desired Result
                                  feedback: str | None - if unsuccessful, provide detailed feedback explaining what failed and how to fix it, or None if successful
                                }  
                            `.trim();

    this.fileLog(
      `🔍 Evaluating with model: ${this.config.evaluator_model}`,
      false,
    );

    try {
      const completion = await this.llmClient.chat.completions.create({
        model: this.config.evaluator_model,
        messages: [{ role: "user", content: evaluationPrompt }],
      });

      const content = completion.choices[0].message.content ?? "";
      this.fileLog(`Evaluation raw response:\n${content}`, false);

      const parsed = this.parseLLMJsonResponse(content);
      return EvaluationResultSchema.parse(JSON.parse(parsed));
    } catch (err) {
      this.fileLog(
        `⚠️ Error evaluating execution output for ${this.config.evaluator_model}. Error: ${err}, falling back to openai/gpt-5 structured output`,
      );

      const fallback = await this.llmClient.chat.completions.create({
        model: "gpt-5",
        messages: [{ role: "user", content: evaluationPrompt }],
        response_format: { type: "json_object" },
      });

      return EvaluationResultSchema.parse(
        JSON.parse(fallback.choices[0].message.content!),
      );
    }
  }

  /* ================================
     Public Entry
  ================================ */

  async direct() {
    let evaluation: EvaluationResult = { success: false, feedback: null };
    let executionOutput = "";
    let success = false;

    for (let i = 0; i < this.config.max_iterations; i++) {
      this.fileLog(`\nIteration ${i + 1}/${this.config.max_iterations}`);

      const prompt = this.createNewAICodingPrompt(
        i,
        this.config.prompt,
        executionOutput,
        evaluation,
      );

      this.aiCode(prompt);
      executionOutput = this.execute();
      evaluation = await this.evaluate(executionOutput);

      this.fileLog(evaluation.success ? "✅ Success" : "❌ Failed");

      if (evaluation.feedback) {
        this.fileLog(`💬 Feedback:\n${evaluation.feedback}`);
      }

      if (evaluation.success) {
        success = true;
        this.fileLog(`🎉 Success achieved after ${i + 1} iterations`);
        break;
      }

      this.fileLog(
        `🔄 Continuing… ${
          this.config.max_iterations - i - 1
        } attempts remaining`,
      );
    }

    if (!success) {
      this.fileLog("🚫 Failed to achieve success within max iterations");
    }

    this.fileLog("Done.");
  }
}

if (require.main === module) {
  const configPath = process.argv[2];

  if (!configPath) {
    console.error(
      "Usage: npx tsx director.ts <path-to-director-config.(yaml|md)>",
    );
    process.exit(1);
  }

  const director = new Director(configPath);

  director.direct().catch((err) => {
    console.error("Director failed:", err);
    process.exit(1);
  });
}
