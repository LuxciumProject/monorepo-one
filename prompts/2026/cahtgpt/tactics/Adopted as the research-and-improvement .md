Adopted as the research-and-improvement tactic for this instruction-building work.

Tactic: Evidence-Grounded Capability and Instruction Improvement
Establish the current OpenAI baseline
Inspect current official OpenAI documentation, release notes, model pages, system cards, Help Center material, and platform documentation.
Identify the exact ChatGPT product, plan, model, mode, tool, and interface involved.
Separate ChatGPT product capabilities from API primitives and developer-controlled orchestration.
Inspect current OpenAI prompting guidance
Review official OpenAI Cookbook material and model-specific prompting guides for the newest relevant models.
Include specialized guidance for reasoning, agents, tools, research, Codex, voice/realtime, images, files, memory, and long-running work where applicable.
Preserve release dates and model versions so recommendations are not transferred from obsolete models without validation.
Perform delta-based improvement
Compare the current evidence with the existing instruction set and working method.
Change only what new capabilities, improved behaviours, or better-supported practices materially justify changing.
Add positive actions the system can now perform more effectively.
Remove obsolete compensations, unnecessary micromanagement, and rules that newer models handle natively.
Preserve established instructions that remain useful and compatible.
Do not rewrite the entire system merely because a newer model exists.
Triangulate specialized evidence
Consult reliable technical analyses, experiments, benchmarks, practitioner reports, and specialized publications.
Use them to investigate behaviours not fully documented by OpenAI.
Distinguish documented capability, observed behaviour, inference, and speculation.
Give official evidence priority when external claims conflict with it.
Compare official Anthropic guidance
Inspect current Anthropic documentation, release notes, model guidance, system cards, and prompting recommendations.
Identify structural similarities between Claude and ChatGPT, such as context management, tool use, agent persistence, instruction hierarchy, verification, long-running tasks, and collaboration.
Do not assume equivalent implementation merely because the capabilities appear functionally similar.
Extract transferable Anthropic practices
Review Anthropic’s official cookbooks, examples, agent patterns, and model-specific prompting material.
Identify practices that are:
positively demonstrated;
compatible with ChatGPT’s actual architecture;
absent or less developed in the current method;
transferable without importing Claude-specific assumptions.
Adapt the underlying principle to ChatGPT rather than copying vendor-specific syntax.
Use temporal and version-aware comparison
Record publication dates, release dates, model generations, product modes, and later revisions.
Compare each recommendation against the model available when it was written.
Treat newer evidence as a possible improvement, not automatic proof that every previous practice is obsolete.
Detect when a blog or forum post describes an older model while presenting its conclusions as current.
Use specialist communities as diagnostic evidence
Inspect technical blogs, developer discussions, user forums, social media, issue trackers, and practitioner reports.
Use recurring complaints and failure reports to discover:
undocumented friction;
confusing product behaviour;
common prompting failures;
tool-routing problems;
context and memory failures;
interaction patterns that degrade performance.
Treat reports as problem signals rather than established facts.
Reconstruct plausible causes using official documentation, experiments, and cross-source comparison.
Convert validated findings into positive practices, mitigations, and regression tests.