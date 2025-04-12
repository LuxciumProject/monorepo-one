To effectively utilize GitHub Copilot within Visual Studio Code, it’s essential to understand how to craft prompts that align with Copilot’s capabilities and the context of your project. Unlike conversational AI prompts, Copilot prompts are designed to generate or assist with code, making specificity and context paramount.

⸻

🧠 Key Best Practices for Crafting Copilot Prompts

1. Provide Clear and Specific Instructions

Begin with a high-level overview of the desired functionality, followed by detailed, step-by-step instructions. This approach helps Copilot generate more accurate and relevant code suggestions.

Example:

// Create a function that fetches user data from an API
// The function should:
// - Use async/await syntax
// - Handle errors with try/catch
// - Return the user data as JSON

This method guides Copilot to produce code that aligns closely with your requirements.

2. Utilize .prompt.md Files for Reusability

For tasks that are repeated across a project, such as generating unit tests or API documentation, consider creating .prompt.md files within your repository. These files can store reusable prompts that maintain consistency and save time. ￼

Example:

# generate-tests.prompt.md

You are a test automation engineer.

Task:
- Generate unit tests for the provided function.
- Use the Jest testing framework.
- Ensure coverage for edge cases and error handling.

Format:
- Provide the test code in a single code block.

By referencing this prompt file, you can quickly generate consistent tests across your codebase.

3. Incorporate Contextual Information

Copilot’s suggestions are influenced by the context provided. Ensure that relevant files are open in your editor, and include comments or documentation that provide additional context. ￼

Example:

# utils.py

"""
Utility functions for data processing.
Includes functions for data normalization and validation.
"""

def normalize_data(data):
    # Implementation here

Having this context allows Copilot to generate suggestions that are more aligned with your project’s structure and standards.

4. Iterate and Refine Prompts

If Copilot’s initial suggestion isn’t satisfactory, refine your prompt by adding more details or rephrasing your instructions. This iterative process helps in honing the output to better meet your needs.

Example:

// Initial prompt:
Create a function to sort an array.

// Refined prompt:
Create a function that sorts an array of integers in ascending order using the quicksort algorithm.

The refined prompt provides more specificity, guiding Copilot to generate a more appropriate solution.

⸻

🔍 Differences Between Copilot and Conversational AI Prompts

Aspect	GitHub Copilot Prompts	Conversational AI Prompts
Purpose	Code generation and assistance	General information and task assistance
Input Format	Code comments, .prompt.md files	Natural language questions or commands
Contextual Awareness	Relies on open files and code context	Relies on conversational history
Output	Code snippets and suggestions	Textual responses and explanations
