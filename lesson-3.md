** Know you IDKS

*** IDK words:
- Create, Update, Delete
- Add, Remove, Move, Replace, Save, Mirror
- Var, Function, Class, Type, File, Default
  

*** Lesson 3 prompts

**** save openai summary in proper file format feature, passing output for via cli arg

```
dataTypes.ts llm.ts main.ts
- CREATE outputFormat.ts:
    CREATE function formatAsStr(transcript: `TranscriptAnalysis`) →> str,
        formatAsJson(...),
        formatAsMarkdown (... ),
UPDATE main.ts:
    ADD a cli arg for file output format DEFAULT text, save output to file with proper extension.
```


dataTypes.ts llm.ts main.ts argParse.ts
```
- MOVE outputFormat cli arg into argParse.ts
```


function formatAsStr(transcript: `TranscriptAnalysis`) →> str - this is ultra definitation pattern. especially function and context name are enough for the model to infer the content of function itself. you can avoid writing tons of code by providing function definition. hold on to this idea. within using list syntax with commas. LLm are great at pattern recognition. 
When we work through there is actually a lot of information we are sending to ai coding assistant in this ai coding prompt. we'll be clear and concise without going into details of how to do it. Remember: WHAT greater than HOW. WHAT is more important than the HOW. Not completely but much much more than than it has been. 

General theme is as learn ai coding start with low-level prompts and slowly remove information. as you progress slowly remove things. But when you starting when you're beginnig ai coding journey and when you wanna progress and actually get things done, just write the extra charecters. communicate clearly with LLMs, and most importantly communicate clearly with yourself. Know exactly the output you want to see by creaing low-level prompt. 

**** let's go  ahead and update transcript analisys to output a bar chart for word frequencies  instead pseudo hash tag chars

Prompt:
package.json src/main.ts 
```CREATE chart.ts: 
        CREATE function wordCountBarChart(threshold_word_count: object): show horizontal barchart, sort decending. 
   UPDATE main.ts:
        REPLACE word count print with wordCountBarChart. 
        MOVE threshold logic AFTER for word loop.
```

This is great way to repeatable consistant PROMPT. And all we trying to do with this pattern is consistently communicate to LLM and ai coding assistant WHERE and WHAT. Notice We did't say how to create this barchart all we did was: add a right context and it had all this information  and it all the information we are giving in our prompt. This is really important pattern you are going to see thoroughout the course and it's great consistant way for you to think about: you get an idea, you get a feature, you get requirements for branch new feature for your work for your application and now you have a repeatable structure to write it out in prompt that's going to give you greate results. Now the game is how much time are you training off to hit the big 3 bulleye right spending time, gathering right context, right down prompt how time do you spend setting up that intersaction and crafting great information dense keyword prompt with a repeatable pattern like prompt phrasing:
 - LOCATION(CREATE chart.ts) -> ACTION(CREATE) -> DETAIL(function wordCountBarChart...)

Prompt:
package.json src/chart.ts src/main.ts transcript-3.txt
```
UPDATE defaultThreshold DEFAULT 10. MOVE wordCountBarChart below analyzeTranscript 
```

Prompt:
package.json src/arg_parse.ts src/chart.ts src/main.ts transcript-3.txt 
```
UPDATE `wordCountBarChart` sort ascending 
```

We are going to run our next prompt with a powerfull MIRROR keyword:

Prompt:  
package.json src/arg_parse.ts src/main.ts src/outputFormat.ts
```
UPDATE main.ts, outputFormat.ts, arg_parse.ts: ADD format_as_yaml() MIRROR format_as_json
```