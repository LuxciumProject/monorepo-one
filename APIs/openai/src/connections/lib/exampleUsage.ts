import { chatWithOpenAI } from "./chats/chatWithOpenAI";

// Example usage

export const exampleUsage = (): void => {
  void chatWithOpenAI(
    "The sky is blue and the grass is green.",
    "/home/luxcium/Téléchargements/images.jpeg",
  );
};
