# Folder Analysis: /prompts/midjourney

## Directory Overview

40 files, 6 directories. Primary purpose: Midjourney AI image generation
prompts, style tuner management scripts, and related ChatGPT conversations
for prompt crafting. Contains prompt templates, API/tuner automation tools,
and v6-specific prompting guides.

## File-Level Analysis

The following list covers all 40 files found in the directory tree.

1. `./API/download-tuners.mjs` — 41 lines, Node.js script to download Midjourney style tuner HTML pages using exec/curl
2. `./API/html/.gitfolder` — 0 lines, placeholder to keep empty directory in git
3. `./API/html/tuners/.gitfolder` — 0 lines, placeholder to keep empty directory in git
4. `./API/html/tuners/file0.html` — 38 lines, HTML containing /imagine prompts with CDN image URLs for professional photo style tuners
5. `./API/mj-list-of-v5-2-style-tuner.txt` — 497 lines, list of Midjourney v5.2 style tuner URLs (tuner.midjourney.com links with counts)
6. `./API/niji-list-of-v5-2-style-tuner.txt` — 20 lines, list of Niji Journey v5.2 style tuner URLs
7. `./API/old-tuners.js` — 47 lines, older/commented-out version of tuner download script
8. `./API/raw-tuners.txt` — 573 lines, raw tuner data with dates, URLs, and descriptions (Jan 2024 exports)
9. `./API/tuner-list.mjs` — 504 lines, JavaScript array of Midjourney tuner URLs to be fetched
10. `./LICENSE` — 18 lines, Luxcium License (NO PERMISSIONS GRANTED)
11. `./Untitled-12.txt` — 1 line, single Midjourney prompt with s.mj.run URLs for art deco man in black suit
12. `./more-job-ids.txt` — 256 lines, list of Midjourney /show job_id commands for retrieving generated images
13. `./prompt-list-0005.txt` — 161 lines, list of /imagine prompts with teencore boy style, fujifilm neopan aesthetic
14. `./prompt-list-0045.txt` — 51 lines, list of /imagine prompts similar to 0005 with crimson/black palette variations
15. `./tentative-prompts/Untitled-1` — 15 lines, MJ prompts for cinematic photo of elite Russian boy with specific aesthetic descriptors
16. `./tentative-prompts/Untitled-10` — 60 lines, brainstorming session for section titles (Simplified Synopsis, Condensed Overview, etc.)
17. `./tentative-prompts/Untitled-11` — 9 lines, meta-discussion about creating a summarization tool, avoiding word "summary"
18. `./tentative-prompts/Untitled-12` — 76 lines, independent sections for brainstorming, section titles and synonyms
19. `./tentative-prompts/Untitled-13` — 54 lines, more section title suggestions (Rephrased Overview, Simplified Synopsis)
20. `./tentative-prompts/Untitled-14` — 94 lines, expanded 20-entry per category title suggestions
21. `./tentative-prompts/Untitled-15` — 5 lines, MJ prompt for tweencore man in black sweater, beach portraits style
22. `./tentative-prompts/Untitled-16` — 22 lines, MJ /imagine prompt for cinematic photography of three elite Mexican boys
23. `./tentative-prompts/Untitled-17` — 20 lines, aspect ratio reference list (1:1, 1:2, 1:3, 2:3, 3:4)
24. `./tentative-prompts/Untitled-18` — 5 lines, ChatGPT response about inability to visit links directly
25. `./tentative-prompts/Untitled-1b` — 130 lines, analysis of multifaceted challenges (urbanization, geopolitics, psychology)
26. `./tentative-prompts/Untitled-2` — 21 lines, emoji-numbered MJ prompt variants for young man in dirt/hoodie
27. `./tentative-prompts/Untitled-3` — 20 lines, MJ /imagine prompts with CDN attachment URLs for elite 23yo male
28. `./tentative-prompts/Untitled-4` — 20 lines, similar CDN-based MJ prompts, variation of Untitled-3
29. `./tentative-prompts/Untitled-5` — 36 lines, more CDN-based MJ prompts, further variations
30. `./tentative-prompts/Untitled-6` — 184 lines, emoji list with titles for section headers (Analysis, Synthesis, Summary, etc.)
31. `./tentative-prompts/Untitled-7` — 53 lines, three-section brainstorming for possible titles (Condensed Recap, Succinct Overview)
32. `./tentative-prompts/Untitled-8` — 54 lines, similar three-section brainstorming format
33. `./tentative-prompts/Untitled-9` — 55 lines, similar three-section brainstorming, plain text format
34. `./tentative-prompts/fashion-photo-of-a 19-year-old.txt` — ~10+ lines, MJ prompts for Finnish college student in branded hoodies (Adidas, Nike, Jordan, Champion, etc.)
35. `./v6/apparel-fullconversation.txt` — 564 lines, full ChatGPT conversation about faster voice responses and apparel vocabulary for MJ v6
36. `./v6/chat-gpt-apparel-words.txt` — 487 lines, ChatGPT conversation about apparel terminology for MJ prompting
37. `./v6/gpt-promptcrafter-v2.txt` — 71 lines, system prompt for "Prompt Crafter" GPT by Luxcium for MJ prompt analysis
38. `./v6/gpt-promptcrafter.txt` — 63 lines, earlier version of Prompt Crafter GPT system prompt
39. `./v6/user-question-apparel.txt` — 50 lines, user's question asking to skip intros/conclusions and give direct answers about apparel
40. `./v6/v6-prompting.md.txt` — 105 lines, guide to V6 prompting system with enhanced semantics and natural language processing

## Thematic Groupings

Five groups emerge from the content analysis.

### Group 1 — Style Tuner Management (7 files in API/)

Scripts and data for downloading and managing Midjourney style tuners.

- `API/download-tuners.mjs`
- `API/old-tuners.js`
- `API/tuner-list.mjs`
- `API/raw-tuners.txt`
- `API/mj-list-of-v5-2-style-tuner.txt`
- `API/niji-list-of-v5-2-style-tuner.txt`
- `API/html/tuners/file0.html`

### Group 2 — Image Generation Prompts (11 files)

Direct Midjourney /imagine prompts and job ID references.

- `prompt-list-0005.txt`
- `prompt-list-0045.txt`
- `more-job-ids.txt`
- `Untitled-12.txt`
- `tentative-prompts/fashion-photo-of-a 19-year-old.txt`
- `tentative-prompts/Untitled-1`
- `tentative-prompts/Untitled-2`
- `tentative-prompts/Untitled-3`
- `tentative-prompts/Untitled-4`
- `tentative-prompts/Untitled-5`
- `tentative-prompts/Untitled-15`
- `tentative-prompts/Untitled-16`

### Group 3 — Meta/Brainstorming Content (12 files)

ChatGPT conversations about section titles, summarization tools, aspect
ratios, and other topics not directly related to Midjourney.

- `tentative-prompts/Untitled-6`
- `tentative-prompts/Untitled-7`
- `tentative-prompts/Untitled-8`
- `tentative-prompts/Untitled-9`
- `tentative-prompts/Untitled-10`
- `tentative-prompts/Untitled-11`
- `tentative-prompts/Untitled-12`
- `tentative-prompts/Untitled-13`
- `tentative-prompts/Untitled-14`
- `tentative-prompts/Untitled-1b`
- `tentative-prompts/Untitled-17`
- `tentative-prompts/Untitled-18`

### Group 4 — V6 Prompting Resources (6 files in v6/)

Midjourney v6-specific guides, GPT system prompts, and apparel vocabulary
conversations.

- `v6/apparel-fullconversation.txt`
- `v6/chat-gpt-apparel-words.txt`
- `v6/gpt-promptcrafter-v2.txt`
- `v6/gpt-promptcrafter.txt`
- `v6/user-question-apparel.txt`
- `v6/v6-prompting.md.txt`

### Group 5 — Housekeeping (3 files)

Repository maintenance and licensing.

- `LICENSE`
- `API/html/.gitfolder`
- `API/html/tuners/.gitfolder`

## Unrelated/Misplaced Content

Several files in `tentative-prompts/` do not belong in a Midjourney
prompts directory.

- **tentative-prompts/Untitled-10 through Untitled-14** — Brainstorming
  sessions about section titles and synonyms; not MJ-related.
- **tentative-prompts/Untitled-1b** — Analysis of urbanization,
  geopolitics, and psychology; completely unrelated to MJ.
- **tentative-prompts/Untitled-6** — Emoji-based section header system;
  belongs in a headers/ directory.
- **tentative-prompts/Untitled-17** — Aspect ratio reference; loosely
  related but more of a general reference.
- **tentative-prompts/Untitled-18** — ChatGPT meta-response about link
  limitations; not MJ content.

## Organization Strategy

Recommended actions to improve the directory layout.

- Rename `tentative-prompts` to something more descriptive like
  `draft-prompts` or `experimental`.
- Move non-MJ brainstorming files (Untitled-10–14, 1b, 6, 18) to a
  separate directory or to `headers/`.
- Give the `Untitled-N` files descriptive names based on their content.
- Consider splitting `API/` tuner content from prompt content more
  clearly.
- Add a `README.md` describing the directory structure and purpose.

## Summary Statistics

File type breakdown across all 40 files.

| Type | Count | Percentage |
| --- | --- | --- |
| Extensionless files | 20 | 50.0% |
| TXT files | 10 | 25.0% |
| MJS/JS files | 4 | 10.0% |
| .gitfolder files | 2 | 5.0% |
| HTML file | 1 | 2.5% |
| Markdown-TXT file | 1 | 2.5% |
| LICENSE file | 1 | 2.5% |
| TXT file with space in name | 1 | 2.5% |
