## Spec based AI coding

spec directory is a folder where you store your specification files, it is a place where you store your plans.

At very top we have 

## "High-Level Objective" - 

Create a CLI transcript analytics application

## Mid-Level Objective - 

There will be more detailed bullet points. So you can see we are getting a little more detailed. We are setting up some more information for our reasoning model and for our ai coding assistant. 

## Implementation Notes

This where can add detailed add how information to let our model know specific details that how we want this code to be generated. Just highlighting and guiding our reasoning model. This is a place where we add information and rules that you want ai coding assistant to follow for this specific feature. now let's talk about

## Context

Our context details are exact context window so what files we want in our context window during the beginning of the task executation and then   the end. So you can see  this can be really valuable for the reasoning model. We're explicitly stating what files it will have available. and we are also stating need to be created by the end of exucutation of the prompt. This is also a really important section, because it helps you the engineer workthrough what you expect from the beginning to the end. 

So last and most important section

## Low-Level Tasks

These are individual tasks broken into a numbered list and each one is high-level and low-level prompt. That's right.



 The spec prompt is effectively a set of  directions followed by a list of prompts. This is an ultra important structure. 
 Everything you learnt so far compounding into this powerful spec propmt. The huge breakthrough here is our reasoning model is capable of  generating every single task we have here. It's running its own internal chain of thought also known as a prompt chain. The key aspect of low-level task is that it's ordered from start to finish. Ordered task lets us do a couple of things. they allow us communicate with the individual prompts and their outcome in stacking compounding fashion. So we can refer  content of previous prompt and later prompts. 

 Type based ai coding is massive powerful unlock. Data types, interfaces, classes are a fantastic way to communicate information to a llm. as discussed in l3 these are IDKs, right? Types, functions,   variables, files, these are all things have strong refernce point, strong locations and strong meaning associated with them.

 This is a power of  having a list of tasks that can be executed by powerful reasoning model in order thanks to our specification document.  

 Important piece - if you write bad prompt here reasonal model can and will make mistakes. In fact, with with spec prompt, you should expect to run another aider instance to cleanup anything that needs change.  

 To truly master AI coding, you want to let your AI assistant do the work for you. All we are doing is now investing more time upfront to communicate properly what we want done through a plan.
 
 About Mid-Level Objectives:

 Imagine what you want to see thinking about what you would want to communicate to not just the llm but to yourself if you are writing this. Or to another engineer. If you're writing plan to them to generate the code for.  

 Implementation Notes.

 so, technical details, dependencies, coding stantdarts and just other informations. This is where we can kind of be more specific this where guide our reasoning model, this where we can be more perscriptive about minor notes or tweaks that we want our assistant be aware of. 

 ==

 What we want is we gonna setting up patterns for use so that  every piece of compute, every autocompleter, every prompt, every coding assistant, they also to understand language of your speaking, why, because your language is consistant, because your language is information reach. 

 When you start setting up these patterns you start speak in a reusable language that you know your computer more specifically  lang models understand. This is the power of consistancy, power of pattern recongnition and it's power of IDKs. So, you can see everything we are doing here is stacking up word speaking the language of  llms. 

 It might seem like a disadvantage having to wait for a reasoning model to return, but it actually helps you to think ahead, there is always something else you can be doing to progress your engineering. Including writing your next specification prompt. or setting up your secondary assitant like we can do write now, get ready to iterate on whatever result are architect instance gives us.

 This technique can run on any codebase you have, any single codebase you have. All about putting together great plan and you know using aider as a powerfull code editing tool. And to be clear I know we are taking bored to aider specific things. but this architect model pattern is simple. You have a draft a draft prompt and you have an execution prompt. 

 This is one of the techniques in the course that can take some time and effort to understand and use. it's critically important to take some time to understand and to write out spec prompts. Write this idea of spec prompt. Planning your work and handing that of to powerful reasoning model. You want to spent time to understant and use this. 

 Reasoning models are particularly advsntage  to writing and generating massive amount of code. 

 As you write more spec docs, you start to notice something incredible. The spec will get you 80 percent of the way there. Then you will get to 85%, then 90 and as you improve as you learn how to write this information rich prompts, in right order, with the right information, writing with right context, eventually it will hit 100 percent. Once it happens to you couple of times, you will have a massive aha moments. Whe you wirte perfect spec prompt and llm interprets it perfectly AND you make 5-10-20 multiple edits at once. That's a moment you transform into an engineer of future. I hope you can see how and why. 