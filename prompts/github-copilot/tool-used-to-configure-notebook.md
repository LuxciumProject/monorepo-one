Tool used to configure a Notebook. ALWAYS use this tool before running/executing any Notebook Cells for the first time or before listing/installing packages in Notebooks for the first time. I.e. there is no need to use this tool more than once for the same notebook.

List the installed packages that are currently available in the selected kernel for a notebook editor. This tool should be used when working with a jupyter notebook with python code cells. Do not use this tool if not already working with a notebook, or for a language other than python. If the tool configure_notebooks exists, then ensure to call configure_notebooks before using this tool.

This tool will retrieve the output for a notebook cell from its most recent execution or restored from disk. The cell may have output even when it has not been run in the current kernel session. This tool has a higher token limit for output length than the runNotebookCell tool.

Install a list of packages on a notebook kernel to be used within that notebook. This tool should be used when working with a jupyter notebook with python code cells. Do not use this tool if not already working with a notebook, or for a language other than python. If the tool configure_notebooks exists, then ensure to call configure_notebooks before using this tool.

This tool will retrieve the details of the Python Environment for the specified file or workspace. The details returned include the 1. Type of Environment (conda, venv, etec), 2. Version of Python, 3. List of all installed packages with their versions. ALWAYS call configure_python_environment before using this tool.

This tool will retrieve the details of the Python Environment for the specified file or workspace. ALWAYS use this tool before executing any Python command in the terminal. This tool returns the details of how to construct the fully qualified path and or command including details such as arguments required to run Python in a terminal. Note: Instead of executing python --version or python -c 'import sys; print(sys.executable)', use this tool to get the Python executable path to replace the python command. E.g. instead of using python -c 'import sys; print(sys.executable)', use this tool to build the command conda run -n <env_name> -c 'import sys; print(sys.executable)'. ALWAYS call configure_python_environment before using this tool.

Installs Python packages in the given workspace. Use this tool to install packages in the user's chosen environment. ALWAYS call configure_python_environment before using this tool.

Get Python environment information for workspace: current active environment and all available environments. Use for: Python environment issues, switching environments, understanding Python setup.

This is a tool for running a code cell in a notebook file directly in the notebook editor. The output from the execution will be returned. Code cells should be run as they are added or edited when working through a problem to bring the kernel state up to date and ensure the code executes successfully. Code cells are ready to run and don't require any pre-processing. If asked to run the first cell in a notebook, you should run the first code cell since markdown cells cannot be executed. NOTE: Avoid executing Markdown cells or providing Markdown cell IDs, as Markdown cells cannot be executed.

This is a tool returns the list of the Notebook cells along with the id, cell types, language, execution information and output mime types for each cell. This is useful to get Cell Ids when executing a notebook or determine what cells have been executed and what order, or what cells have outputs. Requery this tool if the contents of the notebook change.

Run a natural language search for relevant code or documentation comments from the user's current workspace. Returns relevant code snippets from the user's current workspace if it is large, or the full contents of the workspace if it is small.

Request to list all usages (references, definitions, implementations etc) of a function, class, method, variable etc. Use this tool when

Looking for a sample implementation of an interface or class
Checking how a function is used throughout the codebase.
Including and updating all usages when changing a function, method, or constructor

Get git diffs of current file changes in a git repository. Don't forget that you can use run_in_terminal to run git commands in a terminal as well.

Insert new code into an existing file in the workspace. Use this tool once per file that needs to be modified, even if there are multiple changes for a file. Generate the "explanation" property first. The system is very smart and can understand how to apply your edits to the files, you just need to provide minimal hints. Avoid repeating existing code, instead use comments to represent regions of unchanged code. Be as concise as possible. For example: // ...existing code... { changed code } // ...existing code... { changed code } // ...existing code...

Here is an example of how you should use format an edit to an existing Person class: class Person { // ...existing code... age: number; // ...existing code... getAge() { return this.age; } }

This is a tool for making edits in an existing file in the workspace. For moving or renaming files, use run in terminal tool with the 'mv' command instead. For larger edits, split them into smaller edits and call the edit tool multiple times to ensure accuracy. Before editing, always ensure you have the context to understand the file's contents and context. To edit a file, provide: 1) filePath (absolute path), 2) oldString (MUST be the exact literal text to replace including all whitespace, indentation, newlines, and surrounding code etc), and 3) newString (MUST be the exact literal text to replace `oldString` with (also including all whitespace, indentation, newlines, and surrounding code etc.). Ensure the resulting code is correct and idiomatic.). Each use of this tool replaces exactly ONE occurrence of oldString.

CRITICAL for `oldString`: Must uniquely identify the single instance to change. Include at least 3 lines of context BEFORE and AFTER the target text, matching whitespace and indentation precisely. If this string matches multiple locations, or does not match exactly, the tool will fail. Never use ...existing code... comments in the oldString or newString.

Edit text files. Do not use this tool to edit Jupyter notebooks. apply_patch allows you to execute a diff/patch against a text file, but the format of the diff specification is unique to this task, so pay careful attention to these instructions. To use the apply_patch command, you should pass a message of the following structure as "input":

***Begin Patch [YOUR_PATCH]*** End Patch

Where [YOUR_PATCH] is the actual content of your patch, specified in the following V4A diff format.

*** [ACTION] File: [/absolute/path/to/file] -> ACTION can be one of Add, Update, or Delete. An example of a message that you might pass as "input" to this function, in order to apply a patch, is shown below.

***Begin Patch*** Update File: /Users/someone/pygorithm/searching/binary_search.py @@class BaseClass @@ def search():

   pass
   raise NotImplementedError()
@@class Subclass @@ def search():

   pass
   raise NotImplementedError()
*** End Patch Do not use line numbers in this diff format.

Create a new directory structure in the workspace. Will recursively create all directories in the path, like mkdir -p. You do not need to use this tool before using create_file, that tool will automatically create the needed directories.

This is a tool for editing an existing Notebook file in the workspace. Generate the "explanation" property first. The system is very smart and can understand how to apply your edits to the notebooks. When updating the content of an existing cell, ensure newCode includes at least 3-5 lines of context both before and after the new changes, preserving whitespace and indentation exactly.

Generates a new Jupyter Notebook (.ipynb) in VS Code. Jupyter Notebooks are interactive documents commonly used for data exploration, analysis, visualization, and combining code with narrative text. This tool should only be called when the user explicitly requests to create a new Jupyter Notebook.

### readNotebookCellOutput

This tool will retrieve the output for a notebook cell from its most recent execution or restored from disk. The cell may have output even when it has not been run in the current kernel session. This tool has a higher token limit for output length than the runNotebookCell tool.

### installNotebookPackages

Install a list of packages on a notebook kernel to be used within that notebook. This tool should be used when working with a jupyter notebook with python code cells. Do not use this tool if not already working with a notebook, or for a language other than python. If the tool configure_notebooks exists, then ensure to call configure_notebooks before using this tool.

### listNotebookPackages

List the installed packages that are currently available in the selected kernel for a notebook editor. This tool should be used when working with a jupyter notebook with python code cells. Do not use this tool if not already working with a notebook, or for a language other than python. If the tool configure_notebooks exists, then ensure to call configure_notebooks before using this tool.

### configureNotebook

Tool used to configure a Notebook. ALWAYS use this tool before running/executing any Notebook Cells for the first time or before listing/installing packages in Notebooks for the first time. I.e. there is no need to use this tool more than once for the same notebook.
