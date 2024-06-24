// Filename: PythonProxy.ts

// Imports (if any in the future) would go here

/**
 * Class to manage interaction between TypeScript and Python scripts
 */
class PythonProxy {
  private readonly pythonPath: string;

  private readonly scriptPath: string;

  constructor(pythonPath: string, scriptPath: string) {
    this.pythonPath = pythonPath;
    this.scriptPath = scriptPath;
  }

  /**
   * Sets the path to the Python executable
   * @param path - The path to the Python executable
   */
  setPythonPath(path: string): PythonProxy {
    return new PythonProxy(path, this.scriptPath);
  }

  /**
   * Sets the path to the Python script to be executed
   * @param path - The path to the Python script
   */
  setScriptPath(path: string): PythonProxy {
    return new PythonProxy(this.pythonPath, path);
  }

  /**
   * Executes the Python script with the given arguments
   * @param args - Arguments to pass to the Python script
   * @returns - A promise that resolves to the script output
   */
  async executeScript(args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const { spawn } = require('child_process');
      const pythonProcess = spawn(this.pythonPath, [this.scriptPath, ...args]);

      let output = '';
      pythonProcess.stdout.on('data', (data: Buffer) => {
        output += data.toString();
      });

      pythonProcess.stderr.on('data', (data: Buffer) => {
        reject(new Error(data.toString()));
      });

      pythonProcess.on('close', (code: number) => {
        if (code !== 0) {
          reject(new Error(`Python script exited with code ${code}`));
        } else {
          resolve(output);
        }
      });
    });
  }
}

export default PythonProxy;
