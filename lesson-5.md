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