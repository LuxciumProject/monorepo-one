import { type SpawnOptionsWithoutStdio, spawn } from "node:child_process";
import type { ImageData, ProcessingStep } from "../types";

/**
 * Creates a processing step that applies a Python-based filter to an image
 * @param scriptPath Path to the Python script
 * @param filterName Name of the filter to apply
 * @returns ProcessingStep that handles Python filter application
 */
export function createPythonFilterStep(
  scriptPath: string,
  filterName: string,
): ProcessingStep {
  if (!scriptPath) {
    throw new Error("Script path is required for Python filter operation");
  }

  return {
    name: `pythonFilter_${filterName}`,
    process: async (image: ImageData): Promise<ImageData> => {
      if (!image.buffer) {
        throw new Error("Image buffer is required for Python filter operation");
      }

      const options: SpawnOptionsWithoutStdio = {
        cwd: process.cwd(),
        env: process.env,
      };

      const pythonProcess = spawn("python", [scriptPath], options);

      void pythonProcess.on("error", (error) => {
        console.error(
          `Failed to execute Python script at ${scriptPath}:`,
          error,
        );
      });

      // Return unmodified image for now
      // TODO: Implement actual Python script execution and image processing
      return image;
    },
  };
}
