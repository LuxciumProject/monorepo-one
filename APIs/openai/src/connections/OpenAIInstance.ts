import OpenAI from "openai";

export type OpenAIInstance = {
  openai: OpenAI;
  currentDate: string;
};
