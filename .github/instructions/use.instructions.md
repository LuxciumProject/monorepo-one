Use .instructions.md files
You can also create one or more .instructions.md files to store custom instructions for specific tasks. For example, you can create instruction files for different programming languages, frameworks, or project types.

VS Code can automatically add instructions files to all chat requests, or you can specify for which files the instructions should be applied automatically. Alternatively, you can manually attach instructions files to a chat prompt.

VS Code supports two types of scopes for instruction files:

Workspace instructions files: are only available within the workspace and are stored in the .github/instructions folder of the workspace.
User instruction files: are available across multiple workspaces and are stored in the current VS Code profile.
Instructions file structure
An instructions file is a Markdown file with the .instructions.md file suffix. The instructions file consists of two sections:

(Optional) Header with metadata (Front Matter syntax)

description: A brief description of the instructions file. This description is displayed when you hover the instructions file in the Chat view.

applyTo: Specify a glob pattern for files to which the instructions are automatically applied. To always include the custom instructions, use the ** pattern.

For example, the following instructions file is always applied:

---
applyTo: "**"
---
Add a comment at the end of the file: 'Contains AI-generated edits.'
Copy
Body with the instruction content

Specify the custom instructions in natural language by using Markdown formatting. You can use headings, lists, and code blocks to structure the instructions.

You can reference other instruction files by using Markdown links. Use relative paths to reference these files, and ensure that the paths are correct based on the location of the instruction file.

Create an instructions file
You can create instructions files in your workspace or user profile. Workspace instructions files are only available within the workspace, while user instructions files are available across multiple workspaces.

To create an instructions file:

Select the Configure Chat button in the Chat view, select Instructions, and then select New instruction file.

Screenshot showing the Chat view, and Configure Chat menu, highlighting the Configure Chat button.

Alternatively, use the Chat: New Instructions File command from the Command Palette (Ctrl+Shift+P).

Choose the location where the instruction file should be created.

Workspace: By default, workspace instruction files are stored in the .github/instructions folder of your workspace. Add more instruction folders for your workspace with the chat.instructionsFilesLocations setting.

User profile: User instruction files are stored in the current profile folder. You can sync your user instruction files across multiple devices by using Settings Sync.

Enter a name for your instruction file.

Author the custom instructions by using Markdown formatting.

Specify the applyTo metadata property in the header to configure when the instructions should be applied automatically. For example, you can specify applyTo: "**/*.ts,**/*.tsx" to apply the instructions only to TypeScript files.

To reference additional workspace files, use Markdown links ([index](../index.ts)) or #-reference them (#index.ts) within the instructions file.

To modify an existing instructions file, select the Configure Chat button in the Chat view, select Instructions, and then select an instructions file from the list. Alternatively, use the Chat: Configure Instructions command from the Command Palette (Ctrl+Shift+P) and select the instructions file from the Quick Pick.

Use an instructions file in chat
If you specified the applyTo metadata property in the instructions file, VS Code automatically applies the instructions to all files that match the glob pattern.

To manually attach an instructions file to a chat prompt:

In the Chat view, select Add Context > Instructions and select the instruction file from the Quick Pick.

Run the Chat: Attach Instructions command from the Command Palette (Ctrl+Shift+P) and select the instruction file from the Quick Pick.

Specify custom instructions in settings
You can configure custom instructions for specialized scenarios in your user or workspace settings.

Expand table
Type of instruction	Setting name
Code review	github.copilot.chat.reviewSelection.instructions
Commit message generation	github.copilot.chat.commitMessageGeneration.instructions
Pull request title and description generation	github.copilot.chat.pullRequestDescriptionGeneration.instructions
Code generation (deprecated)*	github.copilot.chat.codeGeneration.instructions
Test generation (deprecated)*	github.copilot.chat.testGeneration.instructions
* The codeGeneration and testGeneration settings are deprecated as of VS Code 1.102. We recommend that you use instructions files instead (.github/copilot-instructions.md or *.instructions.md).

You can define the custom instructions as text in the settings value (text property) or reference an external file (file property) in your workspace.

The following code snippet shows how to define a set of instructions in the settings.json file.

    "github.copilot.chat.pullRequestDescriptionGeneration.instructions": [
        { "text": "Always include a list of key changes." },
    "github.copilot.chat.reviewSelection.instructions": [
        { "file": "guidance/backend-review-guidelines.md" },
        { "file": "guidance/frontend-review-guidelines.md" }
  ]
Copy
Generate an instructions file for your workspace
VS Code can analyze your workspace and generate a matching .github/copilot-instructions.md file with custom instructions that match your coding practices and project requirements.

To generate an instructions file for your workspace:

Select the Configure Chat button in the Chat view and select Instructions

Select Generate instructions from the Quick Pick.

Review the generated instructions file and make any necessary edits.

Tips for defining custom instructions
Keep your instructions short and self-contained. Each instruction should be a single, simple statement. If you need to provide multiple pieces of information, use multiple instructions.

Don't refer to external resources in the instructions, such as specific coding standards.

Split instructions into multiple files. This approach is useful for organizing instructions by topic or type of task.

Make it easy to share custom instructions with your team or across projects by storing your instructions in instruction files. You can also version control the files to track changes over time.

Use the applyTo property in the instruction file header to automatically apply the instructions to specific files or folders.

Reference custom instructions in your prompt files to keep your prompts clean and focused, and to avoid duplicating instructions for different tasks.
