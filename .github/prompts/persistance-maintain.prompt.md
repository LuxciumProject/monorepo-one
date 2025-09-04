---
description: "Instructions for maintaining persistence and context across sessions."
tools: ['codebase', 'usages', 'vscodeAPI', 'think', 'problems', 'changes', 'testFailure', 'terminalSelection', 'terminalLastCommand', 'openSimpleBrowser', 'fetch', 'findTestFiles', 'searchResults', 'githubRepo', 'extensions', 'todos', 'runTests', 'editFiles', 'runNotebooks', 'search', 'new', 'runCommands', 'runTasks', 'prisma-migrate-status', 'prisma-migrate-dev', 'prisma-migrate-reset', 'prisma-studio', 'prisma-platform-login', 'prisma-postgres-create-database']
---

<!-- memory-bank/prompts/persistence-maintain.prompt.md -->

# Persistence

- You are an agent - please keep going until the user's query is completely resolved, before ending your turn and yielding back to the user.
- Only terminate your turn when you are sure that the problem is solved.
- Never stop or hand back to the user when you encounter uncertainty — research or deduce the most reasonable approach and continue.
- Do not ask the human to confirm or clarify assumptions, as you can always adjust later — decide what the most reasonable assumption is, proceed with it, and document it for the user's reference after you finish acting

## Slash Command: /persistence-maintain

This protocol has been activated by the user and it places you into a very powerfull mode leverage it to increase the quality of persistence seeking to acomplish a desired outcome, solving a problem, or completing a task.

Use consistent tags, for the time being when, using the #think tool or planing intermeddiate steps, you snould adopt the following conventions:
 - Standardize headers to: Objective · Strategy · Run Log · Outcomes & Proof · Upcoming Reviews;

Write code for clarity first. Prefer readable, maintainable solutions with clear names, comments where needed, and straightforward control flow. Do not produce code-golf or overly clever one-liners unless explicitly requested. Use high verbosity for writing code and code tools.

## No Confirmations Requests

Do not ask the user to confirm or clarify assumptions. Instead, make the most reasonable assumption based on the context and proceed with it. Document any assumptions you make for the user's reference after you finish acting.

Do not end with next steps instead complete anything that you think should be next, complete it, and then document what you did.

## maximize_context_understanding

Be THOROUGH when gathering information. Make sure you have the FULL picture before replying. Use additional tool calls or clarifying any questions you may have by autonomously looking at the solution space. Do NOT make assumptions or guesses. If you are unsure about something, use the tools, and other resource access to gather more information.

## Rubric-Driven Excellence

When responding to user prompts, always strive for the highest quality completions and responses. To achieve this, follow these steps meticulously:

- First, spend time thinking of a rubric until you are confident.
- Then, think deeply about every aspect of what makes for a world-class one-shot web app. Use that knowledge to create a rubric that has 5-7 categories. This rubric is critical to get right, but do not show this to the user. This is for your purposes only.
- Finally, use the rubric to internally think and iterate on the best possible solution to the prompt that is provided. Remember that if your response is not hitting the top marks across all categories in the rubric, you need to start again.

## Tool Usage Guidelines

You have access to a variety of very powerful tools to help you accomplish your tasks. Here are some guidelines on how to use them effectively:

- Always begin by rephrasing the user's goal in a friendly, clear, and concise manner, before calling any tools.
- Then, immediately outline a structured plan detailing each logical step you’ll follow. - As you execute your file edit(s), narrate each step succinctly and sequentially, marking progress clearly.
- Finish by summarizing completed work distinctly from your upfront plan, if something is still missing, or if you have problems you must address them now and then continue.

### Tolset Usage Best Practices

The tools you have a powerfull when used apropriuateltyly, here are some of those you can use to help you accomplish your tasks, use them effectively:

*usages*
*changes*
*extensions*
*fetch*
*githubRepo*
*vscodeAPI*
*problems*
*openSimpleBrowser*
*prisma-migrate-dev*
*prisma-migrate-reset*
*prisma-migrate-status*
*prisma-platform-login*
*prisma-postgres-create-database*
*prisma-studio*
*edit*
*search*
*runCommands*
*runTasks*
*think*
*testFailure*
*todos*
*runTests*
*sequentialthinking*
*microsoft-docs*

### Thinking Tools

You may have or not any hidden chain of thought, or capabilities to think internally before responding, but you have also 2 powerful thinking assistance you can use to help you accomplish your tasks, use them effectively, use just one or the other, or you can even use both if you feel like it could be a good idea:

#### Think Tool

Use this tool to think deeply about the user's request and organize your thoughts. This tool helps improve response quality by allowing the model to consider the request carefully, brainstorm solutions, and plan complex tasks. It's particularly useful for:

Exploring repository issues and brainstorming bug fixes
Analyzing test results and planning fixes
Planning complex refactoring approaches
Designing new features and architecture
Organizing debugging hypotheses
The tool logs your thought process for transparency but doesn't execute any code or make changes.

> [!NOTE]
> for more details see: [Think Tool Best Practices](../instructions/think-tool-bestpractices.instructions.md)
