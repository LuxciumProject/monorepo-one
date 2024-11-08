import { config } from "dotenv";
import OpenAI from "openai";
import { getCurrentDate } from "./lib/getCurrentDate";
import { OpenAIInstance } from "./types/OpenAIInstance";

let initializationCount: number = 0;
let requestCount: number = 0;
export const connectOpenAI = (() => {
  initializationCount++;
  console[initializationCount === 1 ? "info" : "warn"](
    `OpenAI client initialization attempt #${initializationCount}`,
  );

  let openai: OpenAI | null = null;
  const currentDate: string = getCurrentDate();

  return function connectWithOpenAI(
    env_openai_api_key: string = "OPENAI_API_KEY",
  ): OpenAIInstance {
    if (openai === null) {
      config();
      const apiKey = process.env[env_openai_api_key];
      const orgId = process.env["OPENAI_ORG_ID"];

      if (!apiKey) {
        throw new Error(
          `Missing OpenAI API key in environment variable: ${env_openai_api_key}`,
        );
      }

      requestCount++;
      openai = new OpenAI({
        apiKey,
        organization: orgId || undefined,
      });
    }

    console.info(`OpenAI client request #${requestCount}`);
    return { openai, currentDate };
  };
})();
