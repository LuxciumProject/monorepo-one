# Folder Analysis: /prompts/openai-api

This report provides a comprehensive analysis of the `openai-api` directory.

## Directory Overview

- **Total files**: 1
- **Total directories**: 0 (root only)
- **Primary purpose**: Stores a structured reference outline of the OpenAI API, cataloging all endpoints, objects, and streaming events in YAML format.

## File-Level Analysis

| File | Type | Lines | Description |
|------|------|-------|-------------|
| `API-Reference.yml` | YAML | 656 | A comprehensive hierarchical outline of the entire OpenAI API surface, covering Responses, Realtime, Assistants, Chat, Images, Audio, Models, Files, and administrative endpoints. |

### API-Reference.yml

This is the largest file across all analyzed directories (656 lines). It provides a structured table-of-contents-style reference for the OpenAI API, organized into major sections:

- **Responses API**: Responses CRUD, Conversations, Streaming events (detailed event hierarchy)
- **Realtime API**: Sessions, Conversations, Input/Output audio, Transcription, Client/Server events
- **Assistants API** (legacy): Assistants, Threads, Messages, Runs, Run Steps, Vector Stores
- **Chat API**: Chat Completions (create, streaming)
- **Images API**: Generation, editing, variation
- **Audio API**: Speech creation, transcription, translation
- **Models API**: List and retrieve models
- **Files API**: Upload, list, retrieve, delete, content retrieval
- **Uploads API**: Multi-part upload management
- **Moderations API**: Content moderation
- **Embeddings API**: Vector embeddings
- **Fine-tuning API**: Jobs, events, checkpoints, permissions
- **Batch API**: Batch processing
- **Evals API**: Evaluations, runs, output items
- **Vector Stores API**: Store management, file operations, file batches
- **Organizations/Projects/Users**: Administrative APIs
- **Audit Logs, Usage, Invites, Certificates**: Operational APIs

## Thematic Groupings

All content belongs to a single theme: **OpenAI API reference documentation**. The YAML structure creates natural sub-groupings by API domain.

## Unrelated/Misplaced Content

No files appear misplaced. However, this is a reference document rather than a prompt. Its presence in `/prompts/` suggests it may be used as context material when crafting API-related prompts, but it could also fit in a `/docs/` or `/references/` directory.

## Organization Strategy

- **Current state**: Single comprehensive reference file. Well-structured internally.
- **Suggestion**: Consider whether this belongs in `/prompts/` or would be better placed in `/docs/api/` since it is reference material rather than a prompt template.
- **Suggestion**: If kept in `/prompts/`, add a header comment explaining its purpose as context material for prompt engineering.
- **Suggestion**: Consider splitting into per-API-domain files if the reference grows or needs targeted inclusion in prompts.

## Summary Statistics

| Metric | Value |
|--------|-------|
| Total files | 1 |
| Text files (`.txt`) | 0 |
| Markdown files (`.md`) | 0 |
| YAML files (`.yml`) | 1 |
| Total lines | 656 |
