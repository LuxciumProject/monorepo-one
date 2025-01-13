# Template generation

Template generation of new folders root for the project.

Below is a comprehensive proposal that defines multiple project templates you can use for your monorepo. Each template is designed to help you quickly spin up projects for different technologies while adhering to your folder structure and best practices. The proposal includes:

1. **Monorepo Folder Structure Overview**  
2. **Python Package Template**  
3. **TypeScript Library Template**  
4. **Next.js Project Template**  
5. **A Unified Scaffolding Script**  

Feel free to suggest modifications or additional details as needed.

---

## 1. Monorepo Folder Structure Overview

Let’s assume your monorepo follows a common structure such as:

```plaintext
monorepo/
├── packages/
│   ├── python-packages/       # Contains all Python packages
│   │   └── my_python_package/
│   │       ├── src/
│   │       ├── tests/
│   │       ├── setup.py
│   │       └── README.md
│   ├── typescript-libraries/  # Contains all TypeScript libraries
│   │   └── my_ts_library/
│   │       ├── src/
│   │       ├── tests/
│   │       ├── package.json
│   │       ├── tsconfig.json
│   │       └── README.md
│   └── nextjs-projects/       # Contains all Next.js projects
│       └── my_nextjs_app/
│           ├── components/
│           ├── pages/
│           ├── public/
│           ├── styles/
│           ├── next.config.js
│           └── README.md
└── tools/                     # Common tooling scripts (if needed)
```plaintext

Each template below is configured to fit within one of these directories.

---

## 2. Python Package Template

**Folder Structure Example (inside `monorepo/packages/python-packages/my_python_package/`):**

```plaintext
my_python_package/
├── src/
│   └── my_package/
│       ├── __init__.py
│       └── core.py        # Your main logic goes here
├── tests/
│   └── test_core.py
├── setup.py               # Packaging script
├── requirements.txt       # Dependencies for development
└── README.md
```

**Sample Files:**

- **setup.py**

  ```python
  from setuptools import setup, find_packages

  setup(
      name='my_python_package',
      version='0.1.0',
      packages=find_packages('src'),
      package_dir={'': 'src'},
      install_requires=[
          # Add runtime dependencies here
      ],
      extras_require={
          'dev': [
              'pytest',
          ],
      },
      author='Your Name',
      description='A short description of my_python_package.',
      long_description=open('README.md').read(),
      long_description_content_type='text/markdown',
      url='https://github.com/yourusername/yourrepo',
  )
  ```

- **src/my_package/core.py**

  ```python
  def main():
      print("Hello from my_python_package!")
  
  if __name__ == "__main__":
      main()
  ```

- **tests/test_core.py**

  ```python
  import pytest
  from my_package import core

  def test_main(capsys):
      core.main()
      captured = capsys.readouterr().out.strip()
      assert captured == "Hello from my_python_package!"
  ```

---

## 3. TypeScript Library Template

**Folder Structure Example (inside `monorepo/packages/typescript-libraries/my_ts_library/`):**

```plaintext
my_ts_library/
├── src/
│   └── index.ts          # Entry point
├── tests/
│   └── index.test.ts     # Test file (using Jest or another framework)
├── package.json          # NPM package configuration
├── tsconfig.json         # TypeScript configuration
└── README.md
```

**Sample Files:**

- **package.json**

  ```json
  {
    "name": "my_ts_library",
    "version": "0.1.0",
    "description": "A short description of my_ts_library.",
    "main": "dist/index.js",
    "scripts": {
      "build": "tsc",
      "test": "jest"
    },
    "repository": {
      "type": "git",
      "url": "https://github.com/yourusername/yourrepo.git"
    },
    "keywords": [],
    "author": "Your Name",
    "license": "MIT",
    "devDependencies": {
      "typescript": "^4.0.0",
      "jest": "^27.0.0",
      "@types/jest": "^27.0.0"
    }
  }
  ```

- **tsconfig.json**

  ```json
  {
    "compilerOptions": {
      "target": "ES6",
      "module": "commonjs",
      "outDir": "dist",
      "strict": true,
      "esModuleInterop": true,
      "forceConsistentCasingInFileNames": true
    },
    "include": [
      "src/**/*"
    ]
  }
  ```

- **src/index.ts**

  ```typescript
  export function hello(): string {
    return "Hello from my_ts_library!";
  }
  ```

- **tests/index.test.ts**

  ```typescript
  import { hello } from "../src/index";

  test('returns hello message', () => {
    expect(hello()).toBe("Hello from my_ts_library!");
  });
  ```

---

## 4. Next.js Project Template

**Folder Structure Example (inside `monorepo/packages/nextjs-projects/my_nextjs_app/`):**

```plaintext
my_nextjs_app/
├── components/           # React components
│   └── Header.tsx
├── pages/                # Next.js pages (includes API routes if needed)
│   └── index.tsx
├── public/               # Static assets
├── styles/               # CSS/SCSS files
│   └── globals.css
├── next.config.js        # Next.js configuration
├── package.json          # Package configuration for Next.js
└── README.md
```

**Sample Files:**

- **package.json**

  ```json
  {
    "name": "my_nextjs_app",
    "version": "0.1.0",
    "private": true,
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start"
    },
    "dependencies": {
      "next": "latest",
      "react": "latest",
      "react-dom": "latest"
    },
    "devDependencies": {
      "typescript": "^4.0.0",
      "@types/react": "^17.0.0",
      "@types/node": "^16.0.0"
    }
  }
  ```

- **next.config.js**

  ```javascript
  module.exports = {
    reactStrictMode: true,
  };
  ```

- **pages/index.tsx**

  ```tsx
  import React from 'react';
  import Head from 'next/head';

  const Home = () => {
    return (
      <div>
        <Head>
          <title>My Next.js App</title>
        </Head>
        <main>
          <h1>Hello from my_nextjs_app!</h1>
        </main>
      </div>
    );
  };

  export default Home;
  ```

- **components/Header.tsx**

  ```tsx
  import React from 'react';

  const Header = () => {
    return <header><h1>My Next.js App Header</h1></header>;
  };

  export default Header;
  ```

---

## 5. Unified Scaffolding Script

You can create a single scaffolding script (using Python, for example) that accepts parameters for the type of project you want to create (Python package, TypeScript library, or Next.js project) and places it into the appropriate monorepo subdirectory.

Below is a simplified example in Python:

```python
#!/usr/bin/env python3
import os
import argparse
import shutil

# Define the base monorepo path (update this as needed)
MONOREPO_PATH = os.path.abspath("monorepo")

# Template definitions with relative paths (assuming you have stored these templates locally)
TEMPLATES = {
    "python": {
        "target_subdir": "packages/python-packages",
        "template_dir": os.path.abspath("templates/python_package")  # where you store a complete python package template
    },
    "typescript": {
        "target_subdir": "packages/typescript-libraries",
        "template_dir": os.path.abspath("templates/ts_library")
    },
    "nextjs": {
        "target_subdir": "packages/nextjs-projects",
        "template_dir": os.path.abspath("templates/nextjs_app")
    },
}

def copy_template(template_path, destination_path):
    if os.path.exists(destination_path):
        print(f"Error: destination '{destination_path}' already exists.")
        return False

    try:
        shutil.copytree(template_path, destination_path)
        print(f"Template copied from {template_path} to {destination_path}.")
        return True
    except Exception as e:
        print(f"Error copying template: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(
        description="Scaffold a new project in your monorepo."
    )
    parser.add_argument("type", choices=TEMPLATES.keys(), help="Type of project to create.")
    parser.add_argument("name", help="Name for the new project (folder name).")
    args = parser.parse_args()

    template_info = TEMPLATES[args.type]
    target_dir = os.path.join(MONOREPO_PATH, template_info["target_subdir"], args.name)

    if copy_template(template_info["template_dir"], target_dir):
        print("Project scaffolded successfully.")
    else:
        print("Project scaffolding failed.")

if __name__ == "__main__":
    main()
```

### Setting Up the Templates Locally

1. Create a folder (e.g., `templates/`) at the same level as your script.
2. Inside `templates/`, create subdirectories for:
   - `python_package`
   - `ts_library`
   - `nextjs_app`
3. In each, place the complete folder structure and sample files as described in sections 2–4.

When you run the script, it will copy the entire template into your monorepo’s corresponding directory.

**Example usage:**

```bash
python scaffold.py python my_python_package
python scaffold.py typescript my_ts_library
python scaffold.py nextjs my_nextjs_app
```

---

## Next Steps

- **Customization:**  
  You can modify individual templates as your best practices evolve. For instance, if you want to add more configuration files (like CI/CD setups, linters, or container definitions), include those in the respective template directories.

- **Containerization:**  
  If you want container support for these projects, consider adding Dockerfiles (or docker-compose files) within each template directory. You might also centralize common container configuration in your monorepo’s `tools/` folder and link to it from the projects.

- **Version Control:**  
  Keep the templates under version control so that updates can be easily managed across all projects.

- **Iterative Improvements:**  
  Since your process is iterative, have a plan in place to update the templates centrally and propagate changes to new projects. For existing projects, document a migration/upgrade process if necessary.

This multi-template setup should provide a solid foundation for all your development needs within your monorepo. Let me know if you need adjustments or additional features in any of these templates!

## Instructions for Using the Scaffolding Script

Below is one consolidated set of instructions that you (or any AI Agent you design) can follow to use the scaffolding script and create a new project folder populated with everything you need and want. This guide assumes that you already have a monorepo with the proper structure and that the template folders (for Python packages, TypeScript libraries, and Next.js projects) are prepared as described previously.

### 1. **Prerequisites**

- **Monorepo Structure:**  
  Ensure your monorepo is organized with subdirectories for each project type. For example:

  ```plaintext
  monorepo/
    ├── packages/
    │   ├── python-packages/
    │   ├── typescript-libraries/
    │   └── nextjs-projects/
    └── tools/        # (optional: for central scripts or container config)
  ```

- **Templates Setup:**  
  Place your ready-to-use project templates in a directory (e.g., a folder named `templates` at the same level as your scaffolding script). Your templates should be organized like so:

  ```plaintext
  templates/
    ├── python_package/   (complete template for a Python package)
    ├── ts_library/       (complete template for a TypeScript library)
    └── nextjs_app/       (complete template for a Next.js project)
  ```

- **Python Environment:**  
  Make sure Python is installed and that you have permission to execute scripts on your development machine.  
  Optionally, create and activate a virtual environment if needed.

- **Script Configuration:**  
  In the scaffolding script, set the `MONOREPO_PATH` constant to the absolute path of your monorepo. This ensures that new projects are placed in the correct location.

---

### 2. **Understanding the Scaffolding Script**

The script (for example, named `scaffold.py`) does the following:

- **Accepts Parameters:**  
  It takes two command-line arguments:
  - The type of project (`python`, `typescript`, or `nextjs`).
  - The name of the new project, which will be used as the folder name.
  
- **Copies the Template:**  
  It looks up the corresponding template directory based on the project type, then copies the entire template into the corresponding subdirectory of your monorepo. For example, if creating a Python package, it will copy the contents of `templates/python_package/` into `monorepo/packages/python-packages/<project_name>/`.

- **Error Handling:**  
  If the destination folder already exists, the script will notify you and exit to avoid overwriting existing work.

---

### 3. **Step-by-Step Instructions for the AI Agent**

1. **Open a Terminal or Command Prompt:**

   Navigate to the directory where the `scaffold.py` script is located.

2. **Set Up Environment Variables (Optional):**

   If your script needs any environment variables (for logging, debugging, etc.), set those first.

3. **Execute the Script with the Correct Arguments:**

   The command follows the format:

   ```bash
   python scaffold.py <project_type> <project_name>
   ```

   - Replace `<project_type>` with one of: `python`, `typescript`, or `nextjs`.
   - Replace `<project_name>` with your desired folder name for the new project.

   **Examples:**
   - To create a new Python package:

     ```bash
     python scaffold.py python my_python_package
     ```

   - To create a new TypeScript library:

     ```bash
     python scaffold.py typescript my_ts_library
     ```

   - To create a new Next.js project:

     ```bash
     python scaffold.py nextjs my_nextjs_app
     ```

4. **Script Execution and Confirmation:**

   - The script will copy the corresponding template folder from the `templates/` directory into the appropriate subdirectory within your monorepo.  
   - Monitor the console output for messages confirming:
     - Each created folder.
     - Each file copied.
     - Any errors (e.g., if the destination folder already exists).

5. **Post-Creation Review:**

   - Once the script has executed successfully, navigate to your monorepo to review the new project structure.
   - Open the new project folder (e.g., `monorepo/packages/python-packages/my_python_package/`) and verify that all expected files and folders are in place.
   - If additional configuration is needed (for example, updating the project name in configuration files), do so manually or by employing further automated scripts.

6. **Iterate as Needed:**

   - Use the same script to generate additional projects or adjust the templates if your rules or project standards change.
   - For any template adjustments, update the respective folders in the `templates/` directory. Future scaffolding will then use the updated templates.

---

### 4. **Additional Notes for the AI Agent**

- **Monitoring and Logging:**  
  Ensure that every action the script takes is logged, either to the console or a file, so that any issues can be tracked.

- **Customization:**  
  If the new project requires further customization (for example, adding a new Dockerfile, CI/CD configurations, or additional setup scripts), make these part of the template or add an additional post-scaffold customization phase.

- **Error Handling:**  
  If the script reports that a folder already exists, consider either:
  - Deleting the old folder (if it’s safe to do so),
  - Renaming the new project, or
  - Modifying the script to handle versioning or merging as needed.

---

Following these instructions, the AI Agent can reliably execute the scaffolding script to create new project folders filled with your required structure and initial configuration. This approach ensures that every new project follows your best practices and fits right into your monorepo, saving time and enforcing consistency.
