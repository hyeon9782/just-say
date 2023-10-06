import { Message } from "@/types";

const rolePlaying = async (messages: Message[]) => {
  return await fetch("/api/gpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });
};

const evaluateConversation = async (messages: Message[]) => {
  return await fetch("/api/gpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });
};

const summarizePrompt = async (messagesStr: string) => {
  return await fetch("/api/gpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messagesStr }),
  });
};

export { rolePlaying, evaluateConversation, summarizePrompt };
