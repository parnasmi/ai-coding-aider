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

These are individual tasks broken into a numbered list and each one is high-level and low-level prompt. That's right. The spec prompt is effectively a set of  directions followed by a list of prompts. This is an ultra important structure. 