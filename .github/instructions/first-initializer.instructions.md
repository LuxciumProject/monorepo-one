1. Create one AGENTS.md
2. Create one .github/copilot-instructions.md
3. Create one .clinerules.md
4. Create one .vscode/settings.json
5. Create a README.md at the root level.
6. Create a memory-bank/chatmode/README.md

tools: ['codebase', 'editFiles', 'fetch']
7. Create a memory-bank/instructions/README.md
8. Create a memory-bank/prompts/README.md



# Custom Chat Modes — Agent perspective (inside VS Code)

Purpose. Explain how an AI agent inside VS Code should author, load, and run a custom `.chatmode.md` to change behavior and tool access.

## Quick summary

1. Create a `.chatmode.md` file.
2. Declare front matter: `description`, `tools`, `model`.
3. Write agent-facing instructions in the body.
4. Save in workspace (`.github/chatmodes/`) or user profile.
5. Open Chat view and select the mode.

## File structure (required)

Front matter (YAML-style) followed by a Markdown instruction body.

Fields the agent cares about:

* `description` — short placeholder shown in UI.
* `tools` — array of tool or tool-set names the chat mode may use. Agents must only call tools listed here.
* `model` — optional. If absent the current model picker value is used.

Body:

* Plain instructions the agent must follow.
* References to other instruction files via Markdown links.
* Constraints for edits, terminal usage, and test runs.

## Minimal agent-oriented example

```markdown
---
description: "Plan and propose code changes. Read-only by default. Request explicit permission to make edits or run terminals."
tools: ['codebase','search','usages']
model: gpt-5-thinking
---
# Agent mode: Planning and analysis
You are an internal VS Code agent. Do not modify files unless explicitly allowed.
Actions allowed:
- Read workspace source files.
- Search and summarize code and tests.
- Propose edit patches in diff blocks.
- When asked, request permission to open a terminal or apply changes.
Output format:
- Provide an Overview, Impact, Step-by-step Implementation, Tests, and a Patch section.
```

## Create the file (inside VS Code)

1. Command Palette: **Chat: New Mode File**.
2. Choose workspace or user profile location.
3. Name it `<name>.chatmode.md`.
4. Fill front matter and body.
5. Commit to repo if workspace-level.

Default workspace path. `.github/chatmodes/` unless `chat.modeFilesLocations` overrides it.

## Managing modes

* Use **Configure Chat** → **Modes** to edit, copy, move, or delete.
* Hover a mode to see description and available actions.

## Agent rules and security

* Tools listed in `tools` restrict runtime capabilities. Honor them.
* Treat `tools` as contractual. Request explicit grant for any extra tool.
* Default to read-only behavior. Explicitly ask before editing files or invoking terminals.
* Document any terminal commands you will run before running them.

## Best practices for authoring

* Keep `description` concise.
* Use explicit allowed/forbidden action lists in the body.
* Prefer small, purpose-focused modes (Plan, Refactor, Test, QA).
* Reference shared instruction files for large policies.
* Version the mode file in the repo for reproducibility.

## Notes about preview and compatibility

* Custom chat modes are experimental in some VS Code builds. Check the Chat view for availability.
* Model names are resolved by the user-selected model picker at runtime if omitted.
