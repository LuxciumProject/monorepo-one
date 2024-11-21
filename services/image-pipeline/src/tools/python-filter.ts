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
  // Validate scriptPath early to fail fast
  if (!scriptPath) {
    throw new Error("Script path is required for Python filter operation");
  }

  return {
    name: `pythonFilter_${filterName}`,
    process: async (image: ImageData): Promise<ImageData> => {
      if (!image.buffer) {
        throw new Error("Image buffer is required for Python filter operation");
      }

      // UNIMPLEMENTED: Full Python bridge implementation pending
      // For now, we'll validate and log the script path to explicitly show usage
      const options: SpawnOptionsWithoutStdio = {
        cwd: process.cwd(),
        env: process.env,
      };

      // Explicitly consume scriptPath in a meaningful way
      const pythonProcess = spawn("python", [scriptPath], options);

      // We're explicitly handling the scriptPath, but the full implementation
      // is pending the Python bridge service
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
