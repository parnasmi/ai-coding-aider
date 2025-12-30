** Know you IDKS

*** IDK words:
- Create, Update, Delete
- Add, Remove, Move, Replace, Save, Mirror
- Var, Function, Class, Type, File, Default

*** Lesson 3 prompts

dataTypes.ts llm.ts main.ts
- CREATE outputFormat.ts:
    CREATE def formatAsStr(transcript: `TranscriptAnalysis`) →> str,
        formatAsJson(...),
        formatAsMarkdown (... ),
UPDATE main.ts:
    ADD a cli arg for file output format DEFAULT text, save output to file with proper extension.


dataTypes.ts llm.ts main.ts argParse.ts
- MOVE outputFormat cli arg into argParse.ts