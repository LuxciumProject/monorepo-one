# Every command for the Codex CLI

Here’s the **complete listing** of every official reference for the **April 16 2025** Codex CLI, plus the built-in help surfaces you see locally:

## **GitHub repo (openai/codex)**

* **README.md**: overview, Quickstart, CLI reference, Recipes, Contributing.
* **docs/** directory: deep-dive guides on configuration, sandboxing, advanced workflows.
* **CHANGELOG.md**: full history including the April 16 release notes.
* **AGENTS.md**: default instruction file for agent-mode workflows.
* **PNPM.md**: pnpm-specific setup & CI guidance.

## **npm registry (`@openai/codex`)**

* Package **README**: install (`npm install -g @openai/codex`), “Why Codex?”, usage snippets.
* **Version history**: all published tags with timestamps & changelog entries.

## **OpenAI Help Center**

* **Codex CLI – Getting Started**: installation, authentication, first commands.
* **Sign in with ChatGPT**: one-step OAuth flow for CLI use.
* **Enterprise admin guide**: setup for org-wide rollout.

## **OpenAI Platform docs**

* **Codex section**: API overview linking out to local CLI setup and model support.

## **OpenAI Blog**

* **Introducing o3 & o4-mini (Apr 16 2025)**: includes “Codex CLI: frontier reasoning in the terminal”.

## **OpenAI Community Forum**

* **Release announcement – o3 & o4-mini (Apr 16 2025)**: links to GitHub & usage notes.
* **Intro to o-series & Codex CLI**: community Q\&A thread.

## **Built-in CLI help (`codex --help`)**

   ```bash
   Usage
     $ codex [options] <prompt>
     $ codex completion <bash|zsh|fish>
   Options
     --version                   Print version and exit
     -h, --help                  Show usage and exit
     -m, --model <model>         Model for completions
     -p, --provider <provider>   Provider (default: openai)
     -i, --image <path>          Include image(s) as input
     -v, --view <rollout>        Inspect saved rollout
     --history                   Browse previous sessions
     --login                     Start sign-in flow
     --free                      Retry free credits
     -q, --quiet                 Only print assistant’s output
     -c, --config                Open AGENTS.md in editor
     -w, --writable-root <path>  Writable sandbox folder
     -a, --approval-mode <mode>  Override approval policy
     --auto-edit                 Auto-approve file edits
     --full-auto                 Auto-approve edits & commands
     --no-project-doc            Don’t include AGENTS.md by default
     --project-doc <file>        Include extra markdown context
     --full-stdout               Don’t truncate stdout/stderr
     --notify                    Enable desktop notifications
     --disable-response-storage  Disable server response storage
   Examples
     $ codex "Write and run a python program that prints ASCII art"
     $ codex -q "fix build issues"
     $ codex completion bash
   ```

## **Interactive slash-commands (`codex /help`)**

   When you start a session (e.g. on May 16 research preview), you get:

   ```plaintext
   Available commands:
     /help         Show this overlay
     /model        Switch LLM model
     /approval     Change auto-approval mode
     /history      Show session history
     /clear        Clear screen & context
     /clearhistory Clear command history
     /bug          Prefill GitHub issue with logs
     /diff         View git diff
     /compact      Summarize & condense context
   Keyboard shortcuts:
     Enter       Send message
     Ctrl+J      Newline
     Up/Down     Scroll prompt history
     Esc(×2)     Interrupt action
     Ctrl+C      Quit Codex
   ```

## **How to spot the April 16 vs May 16 releases**

* **April 16 CLI**: standalone npm package vX.Y.Z, default model `codex-mini-latest`, no slash-commands.
* **May 16 research preview**: version `0.1.2505172129` reporting in the header (`gpt-4.1-mini`), interactive slash-commands, session IDs.

With this you have **every** official source—remote docs, blog, forum, package registry, GitHub, and the built-in help surfaces—for the April 16 2025 Codex CLI.

## 🧑🏻‍🏫📋 Summary

* Enumerated 9 distinct reference surfaces.
* Included GitHub, npm, Help Center, Platform docs, Blog, Forum, local `--help`, interactive slash commands, and release-differentiation tips.
* You can now navigate each directly or use the built-in help to drill into commands.
