# ChatGPT Prompt for GitHub Copilot Configuration in VS Code

Certainly, Benjamin. Let's delve into the configuration options relevant to GitHub Copilot and its Agent Mode within Visual Studio Code, focusing on the `settings.json` file located in the `.vscode/` directory of your workspace.

---

## 🛠️ GitHub Copilot Configuration in `.vscode/settings.json`

The `settings.json` file allows you to customize Copilot's behavior to align with your coding practices. Below are key settings you can define:

### 1. **Enable Copilot Completions**

```json
"github.copilot.enable": {
  "*": true,
  "plaintext": false,
  "markdown": true,
  "javascript": true,
  "typescript": true
}
```

* **Purpose**: Activates Copilot's code suggestions for specified languages.
* **Customization**: Set to `true` or `false` per language to control Copilot's activity.

### 2. **Custom Instructions for Specific Scenarios**

Define tailored instructions for various development tasks:

```json
"github.copilot.chat.codeGeneration.instructions": [
  { "text": "Use TypeScript and follow the Airbnb style guide." }
],
"github.copilot.chat.testGeneration.instructions": [
  { "text": "Write tests using Jest with comprehensive coverage." }
],
"github.copilot.chat.reviewSelection.instructions": [
  { "text": "Ensure code adheres to SOLID principles." }
],
"github.copilot.chat.commitMessageGeneration.instructions": [
  { "text": "Follow Conventional Commits format." }
],
"github.copilot.chat.pullRequestDescriptionGeneration.instructions": [
  { "text": "Summarize changes and reference related issues." }
]
```



* **Purpose**: Provides context-specific guidance to Copilot for generating appropriate responses.
* **Customization**: Adjust the `text` values to reflect your project's standards and practices.([code.visualstudio.com][1])

### 3. **Use Instruction Files**

To maintain organized and reusable instructions, reference external Markdown files:

```json
"github.copilot.chat.codeGeneration.instructions": [
  { "file": ".github/instructions/general.instructions.md" },
  { "file": ".github/instructions/typescript.instructions.md" }
]
```



* **Purpose**: Separates instruction content from the settings file for better maintainability.
* **Customization**: Create `.instructions.md` files with specific guidelines and reference them here.

---

## 🤖 Copilot Agent Mode Configuration

Agent Mode enhances Copilot's capabilities by allowing it to perform multi-step tasks autonomously. Configure it as follows:([code.visualstudio.com][2])

### 1. **Enable Agent Mode**

```json
"chat.agent.enabled": true
```



* **Purpose**: Activates Agent Mode in VS Code.
* **Note**: Requires VS Code version 1.99 or later.([code.visualstudio.com][3])

### 2. **Control Agent Behavior**

```json
"chat.agent.maxRequests": 10,
"github.copilot.chat.agent.runTasks": true,
"github.copilot.chat.agent.autoFix": true
```



* **`chat.agent.maxRequests`**: Limits the number of iterations Agent Mode can perform per task.
* **`github.copilot.chat.agent.runTasks`**: Allows Agent Mode to execute predefined workspace tasks.
* **`github.copilot.chat.agent.autoFix`**: Enables automatic correction of detected issues during task execution.

### 3. **Tool Approval Settings**

```json
"chat.tools.autoApprove": false
```



* **Purpose**: Determines whether tools invoked by Agent Mode require manual approval.
* **Customization**: Set to `true` to auto-approve all tools, or `false` to require confirmation.([Microsoft Learn][4])

---

## 🧠 Summary

By configuring the `settings.json` file in your `.vscode/` directory, you can tailor GitHub Copilot and its Agent Mode to fit your development workflow. This includes enabling or disabling features, providing custom instructions, and controlling the behavior of autonomous tasks. Utilizing external instruction files further enhances maintainability and scalability across projects.

If you need assistance in creating specific `.instructions.md` files or further customization, feel free to ask!

[1]: https://code.visualstudio.com/docs/copilot/copilot-customization?utm_source=chatgpt.com "Customize chat responses in VS Code"
[2]: https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode?utm_source=chatgpt.com "Introducing GitHub Copilot agent mode (preview) - Visual Studio Code"
[3]: https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode?utm_source=chatgpt.com "Use agent mode in VS Code"
[4]: https://learn.microsoft.com/en-us/visualstudio/ide/copilot-agent-mode?view=vs-2022&utm_source=chatgpt.com "Use Copilot agent mode in Visual Studio (Preview) - Learn Microsoft"
